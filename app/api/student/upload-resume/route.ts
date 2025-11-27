import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { db } from '@/db';
import { studentProfiles } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fileName, content } = body as { fileName?: string; content?: string };
    if (!fileName || !content) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const outName = `${session.user.id}_${Date.now()}_${safeFileName}`;
    const outPath = path.join(uploadsDir, outName);

    const buffer = Buffer.from(content, 'base64');
    await fs.writeFile(outPath, buffer);

    const publicUrl = `/uploads/${outName}`;

    // Update student profile resumeUrl
    try {
      await db.update(studentProfiles)
        .set({ resumeUrl: publicUrl })
        .where((sp, { eq }) => eq(sp.userId, session.user.id));
    } catch (e) {
      console.error('Failed to update resumeUrl in DB', e);
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('POST /api/student/upload-resume error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
