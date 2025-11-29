import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Optional: If TypeScript still complains, create a 'nodemailer.d.ts' file with:
// declare module 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json() as {
      name?: string;
      email?: string;
      message?: string;
    };

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Contact API error:', err);
    const errorMessage =
      err && typeof err === 'object' && 'message' in err
        ? (err as any).message
        : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
