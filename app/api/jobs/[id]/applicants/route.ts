import { NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, studentProfiles } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id: jobId } = params;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    // Fetch all applications for this job
    const apps = await db.query.applications.findMany({
      where: eq(applications.jobId, jobId),
    });

    // Fetch student profiles
    const studentIds = apps.map(a => a.studentId);
    const profiles = studentIds.length > 0
      ? await db.query.studentProfiles.findMany({
          where: inArray(studentProfiles.id, studentIds),
        })
      : [];

    const profileMap = new Map(profiles.map(p => [p.id, p]));

    // Map applicants with student info
    const applicants = apps.map(app => {
      const profile = profileMap.get(app.studentId);
      return {
        id: app.studentId,
        name: profile?.fullName || 'Unknown',
        email: profile?.userId,
        university: profile?.university || 'N/A',
        major: profile?.major || 'N/A',
        gpa: profile?.gpa || 'N/A',
        createdAt: app.createdAt,
      };
    });

    return NextResponse.json(applicants);
  } catch (error) {
    console.error('GET /api/jobs/:id/applicants error', error);
    return NextResponse.json({ error: 'Failed to fetch applicants' }, { status: 500 });
  }
}
