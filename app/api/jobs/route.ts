import { NextResponse } from 'next/server';
import { db } from '@/db';
import { jobs, employerProfiles } from '@/db/schema';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { eq, inArray, and, desc } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    // Fetch all active jobs from the database (public endpoint, no auth required)
    const all = await db.query.jobs.findMany({
      where: eq(jobs.isActive, true),
      orderBy: j => [desc(j.createdAt)],
    });

    // Load employer profiles for these jobs
    const employerIds = Array.from(new Set(all.map(j => j.employerId)));
    const employers = employerIds.length > 0
      ? await db.query.employerProfiles.findMany({ where: inArray(employerProfiles.id, employerIds) })
      : [];
    const employerMap = new Map(employers.map(e => [e.id, e]));

    // Normalize employer info
    const payload = all.map(j => ({
      id: j.id,
      title: j.title,
      description: j.description,
      requirements: j.requirements,
      location: j.location,
      type: j.type,
      workMode: j.workMode,
      salary: j.salary,
      createdAt: j.createdAt,
      employer: employerMap.get(j.employerId) ? { id: j.employerId, companyName: employerMap.get(j.employerId)!.companyName, logoUrl: employerMap.get(j.employerId)!.logoUrl } : null,
    }));

    return NextResponse.json(payload);
  } catch (error) {
    console.error('GET /api/jobs error', error instanceof Error ? error.stack || error.message : error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to fetch jobs: ${message}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, requirements, location, type, workMode, salary } = body;

    if (!title || !description || !location || !type || !workMode) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const [inserted] = await db.insert(jobs).values({
      employerId: session.user.profileId,
      title,
      description,
      requirements: requirements || [],
      location,
      type,
      workMode,
      salary: salary || undefined,
    }).returning();

    try { revalidatePath('/student/dashboard'); } catch (e) {}

    // Attach employer info
    const employer = await db.query.employerProfiles.findFirst({ where: eq(employerProfiles.id, inserted.employerId) });

    const payload = {
      id: inserted.id,
      title: inserted.title,
      description: inserted.description,
      requirements: inserted.requirements,
      location: inserted.location,
      type: inserted.type,
      workMode: inserted.workMode,
      salary: inserted.salary,
      createdAt: inserted.createdAt,
      employer: employer ? { id: employer.id, companyName: employer.companyName, logoUrl: employer.logoUrl } : null,
    };

    return NextResponse.json({ success: true, job: payload });
  } catch (error) {
    console.error('POST /api/jobs error', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
