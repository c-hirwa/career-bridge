import { NextResponse } from 'next/server';
import { db } from '@/db';
import { applications } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apps = await db.query.applications.findMany({
      where: eq(applications.studentId, session.user.profileId),
    });

    return NextResponse.json(apps);
  } catch (error) {
    console.error('GET /api/student/applications error', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
