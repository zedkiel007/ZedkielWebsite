import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, data } = body as { filename?: string; data?: string };

    if (!filename || !data) {
      return NextResponse.json({ error: 'Missing filename or data' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileNameOnDisk = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, fileNameOnDisk);

    const buffer = Buffer.from(data, 'base64');
    await fs.writeFile(filePath, buffer);

    // Note: Vercel's filesystem is ephemeral. This saves files locally for development only.
    return NextResponse.json({ ok: true, path: `/uploads/${fileNameOnDisk}` });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
