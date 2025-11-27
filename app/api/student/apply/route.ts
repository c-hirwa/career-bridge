import { NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, jobs } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    // Check if already applied
    const existing = await db.query.applications.findFirst({
      where: and(
        eq(applications.jobId, jobId),
        eq(applications.studentId, session.user.profileId)
      ),
    });

    if (existing) {
      return NextResponse.json({ error: 'Already applied to this job' }, { status: 400 });
    }

    // Check if job exists
    const job = await db.query.jobs.findFirst({ where: eq(jobs.id, jobId) });
    if (!job || !job.isActive) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Insert application
    const [inserted] = await db.insert(applications).values({
      jobId,
      studentId: session.user.profileId,
    }).returning();

    return NextResponse.json({ success: true, application: inserted });
  } catch (error) {
    console.error('POST /api/student/apply error', error);
    return NextResponse.json({ error: 'Failed to apply' }, { status: 500 });
  }
}
