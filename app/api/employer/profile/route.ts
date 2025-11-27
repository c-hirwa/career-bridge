import { NextResponse } from 'next/server';
import { db } from '@/db';
import { employerProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await db.query.employerProfiles.findFirst({
      where: eq(employerProfiles.userId, session.user.id),
    });

    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      id: profile.id,
      companyName: profile.companyName,
      industry: profile.industry,
      companySize: profile.companySize,
      website: profile.website,
      description: profile.description,
      logoUrl: profile.logoUrl,
    });
  } catch (error) {
    console.error('GET /api/employer/profile error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { companyName, industry, companySize, website, description, logoUrl } = body;

    const updated = await db.update(employerProfiles)
      .set({
        companyName: companyName ?? undefined,
        industry: industry ?? undefined,
        companySize: companySize ?? undefined,
        website: website ?? undefined,
        description: description ?? undefined,
        logoUrl: logoUrl ?? undefined,
      })
      .where(eq(employerProfiles.userId, session.user.id))
      .returning();

    return NextResponse.json({ success: true, profile: updated[0] });
  } catch (error) {
    console.error('PATCH /api/employer/profile error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
