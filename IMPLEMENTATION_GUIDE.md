# CareerBridge Implementation Guide
## Migrating to Next.js 14 App Router with Server Actions, PostgreSQL & Drizzle ORM

This guide will help you transform your prototype into a production-ready application.

---

## Phase 1: Project Setup & Installation

### Step 1: Initialize Next.js 14 Project
```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest careerbridge --typescript --tailwind --app --no-src-dir

# Navigate to project
cd careerbridge
```

When prompted, select:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ✅ No `src/` directory
- ✅ Import alias (@/*)

### Step 2: Install Required Dependencies
```bash
# Database & ORM
npm install drizzle-orm postgres
npm install -D drizzle-kit

# Authentication (NextAuth.js v5)
npm install next-auth@beta @auth/drizzle-adapter
npm install bcryptjs
npm install -D @types/bcryptjs

# UI Components (shadcn/ui)
npx shadcn-ui@latest init

# Additional utilities
npm install zod
npm install date-fns
npm install lucide-react
```

### Step 3: Install shadcn/ui Components
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add toast
```

---

## Phase 2: Database Setup

### Step 4: Setup PostgreSQL Database

**Option A: Local PostgreSQL with pgAdmin**
1. Install PostgreSQL from https://www.postgresql.org/download/
2. Install pgAdmin 4 from https://www.pgadmin.org/download/
3. Open pgAdmin and create a new database:
   - Right-click "Databases" → Create → Database
   - Name: `careerbridge`
   - Owner: `postgres` (or your user)
   - Click "Save"

**Option B: Cloud Database (Recommended for Production)**
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Neon: https://neon.tech/
- Supabase: https://supabase.com/

### Step 5: Configure Environment Variables

Create `.env.local` in your project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/careerbridge"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Use this command to generate secret:
# openssl rand -base64 32
```

**Important**: Add `.env.local` to your `.gitignore`

### Step 6: Setup Drizzle ORM

Create `drizzle.config.ts` in project root:

```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

---

## Phase 3: Database Schema Design

### Step 7: Create Database Schema

Create `db/schema.ts`:

```typescript
import { pgTable, text, timestamp, uuid, varchar, integer, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'employer']);
export const jobTypeEnum = pgEnum('job_type', ['internship', 'entry-level']);
export const workModeEnum = pgEnum('work_mode', ['remote', 'onsite', 'hybrid']);
export const applicationStatusEnum = pgEnum('application_status', [
  'submitted',
  'reviewing',
  'interview',
  'rejected',
  'accepted'
]);

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Student profiles
export const studentProfiles = pgTable('student_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  university: varchar('university', { length: 255 }),
  major: varchar('major', { length: 255 }),
  graduationYear: integer('graduation_year'),
  gpa: varchar('gpa', { length: 10 }),
  bio: text('bio'),
  resumeUrl: varchar('resume_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Employer profiles
export const employerProfiles = pgTable('employer_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 255 }),
  companySize: varchar('company_size', { length: 50 }),
  website: varchar('website', { length: 500 }),
  description: text('description'),
  logoUrl: varchar('logo_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Jobs table
export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  employerId: uuid('employer_id').references(() => employerProfiles.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  requirements: text('requirements').array().notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  type: jobTypeEnum('type').notNull(),
  workMode: workModeEnum('work_mode').notNull(),
  salary: varchar('salary', { length: 100 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Applications table
export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => studentProfiles.id, { onDelete: 'cascade' }).notNull(),
  status: applicationStatusEnum('status').default('submitted').notNull(),
  coverLetter: text('cover_letter'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Saved jobs table
export const savedJobs = pgTable('saved_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => studentProfiles.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  studentProfile: one(studentProfiles, {
    fields: [users.id],
    references: [studentProfiles.userId],
  }),
  employerProfile: one(employerProfiles, {
    fields: [users.id],
    references: [employerProfiles.userId],
  }),
}));

export const studentProfilesRelations = relations(studentProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [studentProfiles.userId],
    references: [users.id],
  }),
  applications: many(applications),
  savedJobs: many(savedJobs),
}));

export const employerProfilesRelations = relations(employerProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [employerProfiles.userId],
    references: [users.id],
  }),
  jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employerProfiles, {
    fields: [jobs.employerId],
    references: [employerProfiles.id],
  }),
  applications: many(applications),
  savedBy: many(savedJobs),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  student: one(studentProfiles, {
    fields: [applications.studentId],
    references: [studentProfiles.id],
  }),
}));

export const savedJobsRelations = relations(savedJobs, ({ one }) => ({
  job: one(jobs, {
    fields: [savedJobs.jobId],
    references: [jobs.id],
  }),
  student: one(studentProfiles, {
    fields: [savedJobs.studentId],
    references: [studentProfiles.id],
  }),
}));
```

### Step 8: Create Database Connection

Create `db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
```

### Step 9: Generate and Run Migrations

```bash
# Generate migration files
npx drizzle-kit generate:pg

# Push schema to database (alternative to migrations for development)
npx drizzle-kit push:pg

# Or run migrations
npx drizzle-kit migrate
```

**Verify in pgAdmin**: 
- Connect to your database
- Expand `careerbridge` → Schemas → public → Tables
- You should see all your tables

---

## Phase 4: Authentication Setup

### Step 10: Configure NextAuth.js

Create `lib/auth.ts`:

```typescript
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
```

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
```

### Step 11: Create Type Definitions

Create `types/next-auth.d.ts`:

```typescript
import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: 'student' | 'employer';
    profileId: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: 'student' | 'employer';
      profileId: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'student' | 'employer';
    profileId: string;
  }
}
```

---

## Phase 5: Server Actions Implementation

### Step 12: Create Server Actions for Authentication

Create `app/actions/auth.ts`:

```typescript
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
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    fullName: formData.get('fullName'),
    companyName: formData.get('companyName'),
    university: formData.get('university'),
    industry: formData.get('industry'),
  };

  const validatedData = signUpSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: 'Invalid form data' };
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

    // Sign in the user
    await signIn('credentials', {
      email,
      password,
      role,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return { error: 'Failed to create account' };
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      role,
      redirectTo: role === 'student' ? '/student/dashboard' : '/employer/dashboard',
    });
  } catch (error) {
    return { error: 'Invalid credentials' };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
```

### Step 13: Create Server Actions for Jobs

Create `app/actions/jobs.ts`:

```typescript
'use server';

import { db } from '@/db';
import { jobs, applications, savedJobs, employerProfiles } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq, desc, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const jobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  requirements: z.array(z.string()),
  location: z.string().min(1),
  type: z.enum(['internship', 'entry-level']),
  workMode: z.enum(['remote', 'onsite', 'hybrid']),
  salary: z.string().optional(),
});

export async function createJobAction(formData: FormData) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'employer') {
    return { error: 'Unauthorized' };
  }

  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    requirements: formData.get('requirements')?.toString().split('\n').filter(r => r.trim()),
    location: formData.get('location'),
    type: formData.get('type'),
    workMode: formData.get('workMode'),
    salary: formData.get('salary') || undefined,
  };

  const validatedData = jobSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: 'Invalid job data' };
  }

  try {
    await db.insert(jobs).values({
      ...validatedData.data,
      employerId: session.user.profileId,
    });

    revalidatePath('/employer/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create job' };
  }
}

export async function deleteJobAction(jobId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'employer') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.delete(jobs).where(
      and(
        eq(jobs.id, jobId),
        eq(jobs.employerId, session.user.profileId)
      )
    );

    revalidatePath('/employer/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete job' };
  }
}

export async function applyToJobAction(jobId: string, coverLetter?: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.insert(applications).values({
      jobId,
      studentId: session.user.profileId,
      coverLetter,
      status: 'submitted',
    });

    revalidatePath('/student/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to apply' };
  }
}

export async function saveJobAction(jobId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.insert(savedJobs).values({
      jobId,
      studentId: session.user.profileId,
    });

    revalidatePath('/student/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Already saved or error occurred' };
  }
}

export async function unsaveJobAction(jobId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.delete(savedJobs).where(
      and(
        eq(savedJobs.jobId, jobId),
        eq(savedJobs.studentId, session.user.profileId)
      )
    );

    revalidatePath('/student/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to unsave' };
  }
}
```

---

## Phase 6: App Router Structure

### Step 14: Create App Router Pages

**File Structure:**
```
app/
├── (marketing)/
│   ├── layout.tsx
│   └── page.tsx              # Landing page
├── auth/
│   ├── signin/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── student/
│   ├── dashboard/
│   │   └── page.tsx
│   └── layout.tsx
├── employer/
│   ├── dashboard/
│   │   └── page.tsx
│   └── layout.tsx
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts
├── layout.tsx                # Root layout
└── globals.css
```

### Step 15: Create Root Layout

Create `app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CareerBridge - Connect Students with Opportunities',
  description: 'Job platform connecting students and new graduates with internships and entry-level positions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### Step 16: Create Landing Page

Create `app/(marketing)/page.tsx`:

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, FileText, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bridge Your Career Path
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect students and new graduates with companies offering 
              internships and entry-level positions.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Add more sections from your prototype */}
    </main>
  );
}
```

### Step 17: Create Authentication Pages

Create `app/auth/signin/page.tsx`:

```typescript
import { SignInForm } from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}
```

Create `components/auth/SignInForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { signInAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SignInForm() {
  const [role, setRole] = useState<'student' | 'employer'>('student');

  return (
    <Tabs value={role} onValueChange={(v) => setRole(v as 'student' | 'employer')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="employer">Employer</TabsTrigger>
      </TabsList>

      <TabsContent value={role}>
        <Card>
          <CardHeader>
            <CardTitle>Sign in as {role === 'student' ? 'Student' : 'Employer'}</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={signInAction} className="space-y-4">
              <input type="hidden" name="role" value={role} />
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
```

### Step 18: Create Protected Dashboard Pages

Create `app/student/dashboard/page.tsx`:

```typescript
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { jobs } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { StudentDashboard } from '@/components/student/StudentDashboard';

export default async function StudentDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    redirect('/auth/signin');
  }

  // Fetch jobs from database
  const allJobs = await db.query.jobs.findMany({
    where: (jobs, { eq }) => eq(jobs.isActive, true),
    orderBy: [desc(jobs.createdAt)],
    with: {
      employer: true,
    },
  });

  return <StudentDashboard jobs={allJobs} />;
}
```

Create `app/employer/dashboard/page.tsx`:

```typescript
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { jobs, applications } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { EmployerDashboard } from '@/components/employer/EmployerDashboard';

export default async function EmployerDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'employer') {
    redirect('/auth/signin');
  }

  // Fetch employer's jobs
  const employerJobs = await db.query.jobs.findMany({
    where: eq(jobs.employerId, session.user.profileId),
    orderBy: [desc(jobs.createdAt)],
    with: {
      applications: {
        with: {
          student: true,
        },
      },
    },
  });

  return <EmployerDashboard jobs={employerJobs} />;
}
```

---

## Phase 7: Component Migration

### Step 19: Update Components with "use client" Directive

For all interactive components (forms, buttons with onClick, state management), add `"use client"` at the top:

**Example: Update JobCard component**

```typescript
'use client';

import { saveJobAction, unsaveJobAction, applyToJobAction } from '@/app/actions/jobs';
import { useState, useTransition } from 'react';
// ... rest of imports

export function JobCard({ job, isSaved, hasApplied }) {
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      if (isSaved) {
        await unsaveJobAction(job.id);
      } else {
        await saveJobAction(job.id);
      }
    });
  };

  const handleApply = () => {
    startTransition(async () => {
      await applyToJobAction(job.id);
    });
  };

  return (
    // ... JSX with handleSave and handleApply
  );
}
```

### Step 20: Create Server Component Wrappers

For pages that fetch data, use Server Components:

```typescript
// app/student/dashboard/browse/page.tsx
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { BrowseJobsList } from '@/components/student/BrowseJobsList';

export default async function BrowsePage() {
  const session = await auth();
  
  const jobs = await db.query.jobs.findMany({
    where: (jobs, { eq }) => eq(jobs.isActive, true),
  });

  const savedJobIds = await db.query.savedJobs.findMany({
    where: (savedJobs, { eq }) => eq(savedJobs.studentId, session!.user.profileId),
  }).then(saved => saved.map(s => s.jobId));

  return <BrowseJobsList jobs={jobs} savedJobIds={savedJobIds} />;
}
```

---

## Phase 8: Middleware & Protection

### Step 21: Create Middleware for Route Protection

Create `middleware.ts` in project root:

```typescript
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Protect student routes
  if (pathname.startsWith('/student')) {
    if (!isLoggedIn || userRole !== 'student') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  }

  // Protect employer routes
  if (pathname.startsWith('/employer')) {
    if (!isLoggedIn || userRole !== 'employer') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/student/:path*', '/employer/:path*'],
};
```

---

## Phase 9: Testing & Seeding

### Step 22: Create Seed Script

Create `db/seed.ts`:

```typescript
import { db } from './index';
import { users, studentProfiles, employerProfiles, jobs } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // Create test student
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const [student] = await db.insert(users).values({
    email: 'student@test.com',
    password: hashedPassword,
    role: 'student',
  }).returning();

  await db.insert(studentProfiles).values({
    userId: student.id,
    fullName: 'John Doe',
    university: 'MIT',
    major: 'Computer Science',
  });

  // Create test employer
  const [employer] = await db.insert(users).values({
    email: 'employer@test.com',
    password: hashedPassword,
    role: 'employer',
  }).returning();

  const [employerProfile] = await db.insert(employerProfiles).values({
    userId: employer.id,
    companyName: 'Tech Corp',
    industry: 'Technology',
  }).returning();

  // Create test jobs
  await db.insert(jobs).values([
    {
      employerId: employerProfile.id,
      title: 'Software Engineering Intern',
      description: 'Join our team...',
      requirements: ['Computer Science student', 'React knowledge'],
      location: 'San Francisco, CA',
      type: 'internship',
      workMode: 'hybrid',
      salary: '$25-30/hour',
    },
    // Add more jobs...
  ]);

  console.log('Seeding complete!');
}

seed();
```

Add to `package.json`:

```json
{
  "scripts": {
    "db:seed": "tsx db/seed.ts"
  }
}
```

Install tsx: `npm install -D tsx`

Run: `npm run db:seed`

---

## Phase 10: Deployment

### Step 23: Prepare for Deployment

**Update `package.json`:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate:pg",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx db/seed.ts"
  }
}
```

### Step 24: Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
5. Deploy!

### Step 25: Database Migration on Production

After deploying:
```bash
# Run migrations on production database
npm run db:push
# Or use Drizzle Studio to manage production DB
npm run db:studio
```

---

## Additional Improvements

### Performance Optimizations
1. Add React Suspense for loading states
2. Implement pagination for job listings
3. Use Next.js Image component for logos
4. Add caching with `unstable_cache`

### Features to Add
1. File upload for resumes (use Vercel Blob or S3)
2. Email notifications (use Resend or SendGrid)
3. Search with full-text search in PostgreSQL
4. Analytics dashboard for employers
5. Real-time updates with Pusher or Socket.io

### Security Enhancements
1. Add rate limiting
2. Implement CSRF protection
3. Add input sanitization
4. Set up proper CORS headers

---

## Troubleshooting

### Common Issues

**Database Connection Errors:**
```bash
# Test connection
npx drizzle-kit studio
```

**Migration Errors:**
```bash
# Reset database (development only!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
npm run db:push
```

**Authentication Issues:**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try again

---

## Next Steps Summary

1. ✅ Initialize Next.js 14 project
2. ✅ Install dependencies
3. ✅ Setup PostgreSQL database
4. ✅ Create database schema with Drizzle
5. ✅ Implement authentication with NextAuth
6. ✅ Create Server Actions
7. ✅ Build App Router pages
8. ✅ Migrate components (add "use client" where needed)
9. ✅ Add middleware protection
10. ✅ Seed database with test data
11. ✅ Deploy to Vercel

---

**You're now ready to build a production-ready CareerBridge application!** 🚀

For questions or issues, refer to:
- Next.js Docs: https://nextjs.org/docs
- Drizzle ORM: https://orm.drizzle.team
- NextAuth.js: https://authjs.dev
