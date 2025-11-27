import { NextResponse } from 'next/server';
import { db } from '@/db';
import { jobs } from '@/db/schema';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: jobId } = params;
    if (!jobId) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    // Verify job belongs to employer
    const job = await db.query.jobs.findFirst({ where: eq(jobs.id, jobId) });
    if (!job || job.employerId !== session.user.profileId) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    await db.delete(jobs).where(eq(jobs.id, jobId));
    try { revalidatePath('/employer/dashboard'); } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/jobs/:id error', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
