'use server';

import { db } from '@/db';
import { jobs, applications, savedJobs } from '@/db/schema';
import type { InferModel } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';

export async function createJobAction(formData: FormData) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'employer') {
    return { error: 'Unauthorized' };
  }

  const title = formData.get('title') as string | null;
  const description = formData.get('description') as string | null;
  const requirementsRaw = formData.get('requirements') as string | null;
  const requirements = requirementsRaw ? requirementsRaw.split('\n').filter(r => r.trim()) : [];
  const location = formData.get('location') as string | null;
  const type = formData.get('type') as string | null;
  const workMode = formData.get('workMode') as string | null;
  const salary = formData.get('salary') as string | null;

  // Validate required fields
  if (!title || !description || !location || !type || !workMode) {
    return { error: 'Missing fields' };
  }

  // Validate and coerce enums for Drizzle types
  const allowedTypes = ['internship', 'entry-level'] as const;
  const allowedWorkModes = ['remote', 'onsite', 'hybrid'] as const;

  function isAllowed<T extends readonly string[]>(arr: T, v: unknown): v is T[number] {
    return typeof v === 'string' && (arr as readonly string[]).includes(v);
  }

  if (!isAllowed(allowedTypes, type)) {
    return { error: 'Invalid job type' };
  }
  if (!isAllowed(allowedWorkModes, workMode)) {
    return { error: 'Invalid work mode' };
  }

  const jobType = type as typeof allowedTypes[number];
  const jobWorkMode = workMode as typeof allowedWorkModes[number];

  try {
    const payload: InferModel<typeof jobs, 'insert'> = {
      employerId: session.user.profileId,
      title,
      description,
      requirements,
      location,
      type: jobType,
      workMode: jobWorkMode,
      salary: salary || undefined,
    };

    const [inserted] = await db.insert(jobs).values(payload).returning();

    // Revalidate student dashboard path so server cache updates
    try { revalidatePath('/student/dashboard'); } catch (e) {}

    return { success: true, job: inserted };
  } catch (error) {
    console.error('createJobAction error:', error);
    return { error: 'Failed to create job' };
  }
}

export async function applyJobAction(jobId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    return { error: 'Unauthorized' };
  }

  try {
    // Check if already applied
    const existing = await db.query.applications.findFirst({
      where: and(
        eq(applications.jobId, jobId),
        eq(applications.studentId, session.user.profileId)
      ),
    });

    if (existing) {
      return { error: 'Already applied to this job' };
    }

    // Check if job exists and is active
    const job = await db.query.jobs.findFirst({ where: eq(jobs.id, jobId) });
    if (!job || !job.isActive) {
      return { error: 'Job not found' };
    }

    // Insert application
    const [inserted] = await db.insert(applications).values({
      jobId,
      studentId: session.user.profileId,
    }).returning();

    try { revalidatePath('/student/dashboard'); } catch (e) {}

    return { success: true, application: inserted };
  } catch (error) {
    console.error('applyJobAction error:', error);
    return { error: 'Failed to apply to job' };
  }
}

export async function toggleSaveJobAction(jobId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    return { error: 'Unauthorized' };
  }

  try {
    // Check if already saved
    const existing = await db.query.savedJobs.findFirst({
      where: and(
        eq(savedJobs.jobId, jobId),
        eq(savedJobs.studentId, session.user.profileId)
      ),
    });

    if (existing) {
      // Remove from saved
      await db.delete(savedJobs).where(
        and(
          eq(savedJobs.jobId, jobId),
          eq(savedJobs.studentId, session.user.profileId)
        )
      );
      try { revalidatePath('/student/dashboard'); } catch (e) {}
      return { success: true, saved: false };
    } else {
      // Check if job exists
      const job = await db.query.jobs.findFirst({ where: eq(jobs.id, jobId) });
      if (!job || !job.isActive) {
        return { error: 'Job not found' };
      }

      // Add to saved
      await db.insert(savedJobs).values({
        jobId,
        studentId: session.user.profileId,
      });
      try { revalidatePath('/student/dashboard'); } catch (e) {}
      return { success: true, saved: true };
    }
  } catch (error) {
    console.error('toggleSaveJobAction error:', error);
    return { error: 'Failed to save job' };
  }
}

export async function getStudentApplications(jobId?: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    return { error: 'Unauthorized' };
  }

  try {
    if (jobId) {
      // Get applications for a specific job (for employers)
      const job = await db.query.jobs.findFirst({ where: eq(jobs.id, jobId) });
      if (!job || job.employerId !== session.user.profileId) {
        return { error: 'Unauthorized' };
      }

      const apps = await db.query.applications.findMany({
        where: eq(applications.jobId, jobId),
      });

      return { success: true, applications: apps };
    } else {
      // Get all applications for current student
      const apps = await db.query.applications.findMany({
        where: eq(applications.studentId, session.user.profileId),
      });

      return { success: true, applications: apps };
    }
  } catch (error) {
    console.error('getStudentApplications error:', error);
    return { error: 'Failed to fetch applications' };
  }
}
