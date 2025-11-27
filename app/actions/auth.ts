'use server';

import { signIn, signOut } from '@/lib/auth';
import { db } from '@/db';
import { users, studentProfiles, employerProfiles } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'employer']),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  university: z.string().optional(),
  industry: z.string().optional(),
});

export async function signUpAction(formData: FormData) {
  // Coerce FormData values: convert null -> undefined so zod optional() accepts them
  const getString = (k: string) => {
    const v = formData.get(k);
    if (v === null) return undefined;
    return String(v);
  };

  const rawData = {
    email: getString('email'),
    password: getString('password'),
    role: getString('role'),
    fullName: getString('fullName'),
    companyName: getString('companyName'),
    university: getString('university'),
    industry: getString('industry'),
  };

  console.log('signUpAction rawData:', {
    email: rawData.email,
    password: rawData.password ? '***' : null,
    role: rawData.role,
    fullName: rawData.fullName,
    companyName: rawData.companyName,
    university: rawData.university,
    industry: rawData.industry,
  });

  const validatedData = signUpSchema.safeParse(rawData);

  if (!validatedData.success) {
    console.error('signUpAction validation error:', validatedData.error.format());
    return { error: 'Invalid form data', details: JSON.stringify(validatedData.error.format()) };
  }

  const { email, password, role, fullName, companyName, university, industry } = validatedData.data;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [user] = await db.insert(users).values({
      email,
      password: hashedPassword,
      role,
    }).returning();

    // Create profile
    if (role === 'student' && fullName) {
      await db.insert(studentProfiles).values({
        userId: user.id,
        fullName,
        university,
      });
    } else if (role === 'employer' && companyName) {
      await db.insert(employerProfiles).values({
        userId: user.id,
        companyName,
        industry,
      });
    }

    return { success: true, email, role };
  } catch (error) {
    console.error('signUpAction error:', error);
    return { error: 'Failed to create account' };
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  try {
    // This action is kept for server-side flows, but client sign-in uses next-auth's client `signIn`.
    return { success: true };
  } catch (error) {
    return { error: 'Invalid credentials' };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
