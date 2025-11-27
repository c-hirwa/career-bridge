import { NextResponse } from 'next/server';
import { db } from '@/db';
import { studentProfiles } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await db.query.studentProfiles.findFirst({
      where: (sp, { eq }) => eq(sp.userId, session.user.id),
    });

    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      id: profile.id,
      fullName: profile.fullName,
      university: profile.university,
      major: profile.major,
      graduationYear: profile.graduationYear,
      gpa: profile.gpa,
      bio: profile.bio,
      resumeUrl: profile.resumeUrl,
    });
  } catch (error) {
    console.error('GET /api/student/profile error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, university, major, graduationYear, gpa, bio, resumeUrl } = body;

    const updated = await db.update(studentProfiles)
      .set({
        fullName: fullName ?? undefined,
        university: university ?? undefined,
        major: major ?? undefined,
        graduationYear: graduationYear ?? undefined,
        gpa: gpa ?? undefined,
        bio: bio ?? undefined,
        resumeUrl: resumeUrl ?? undefined,
      })
      .where((sp, { eq }) => eq(sp.userId, session.user.id))
      .returning();

    return NextResponse.json({ success: true, profile: updated[0] });
  } catch (error) {
    console.error('PATCH /api/student/profile error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
