import { NextResponse } from 'next/server';
import { db } from '@/db';
import { savedJobs } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const saved = await db.query.savedJobs.findMany({
      where: eq(savedJobs.studentId, session.user.profileId),
    });

    return NextResponse.json(saved);
  } catch (error) {
    console.error('GET /api/student/saved-jobs error', error);
    return NextResponse.json({ error: 'Failed to fetch saved jobs' }, { status: 500 });
  }
}
