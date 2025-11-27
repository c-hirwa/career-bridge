import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { users, studentProfiles, employerProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'employer']),
});

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password, role } = parsedCredentials.data;

        // Find user
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user || user.role !== role) return null;

        // Verify password
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        // Get profile
        let profile;
        if (role === 'student') {
          profile = await db.query.studentProfiles.findFirst({
            where: eq(studentProfiles.userId, user.id),
          });
        } else {
          profile = await db.query.employerProfiles.findFirst({
            where: eq(employerProfiles.userId, user.id),
          });
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          profileId: profile?.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.profileId = user.profileId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as 'student' | 'employer';
        session.user.profileId = token.profileId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
