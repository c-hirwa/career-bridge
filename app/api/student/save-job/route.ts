import { NextResponse } from 'next/server';
import { db } from '@/db';
import { savedJobs, jobs } from '@/db/schema';
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
      return NextResponse.json({ success: true, saved: false });
    } else {
      // Check if job exists
      const job = await db.query.jobs.findFirst({ where: eq(jobs.id, jobId) });
      if (!job || !job.isActive) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }

      // Add to saved
      await db.insert(savedJobs).values({
        jobId,
        studentId: session.user.profileId,
      });
      return NextResponse.json({ success: true, saved: true });
    }
  } catch (error) {
    console.error('POST /api/student/save-job error', error);
    return NextResponse.json({ error: 'Failed to save job' }, { status: 500 });
  }
}
