import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Force Node runtime for this route so `nodemailer` can run on Vercel.
export const runtime = 'nodejs';

// Ensure this route runs on Node (nodemailer requires a Node runtime)
// If your Next server forces Edge runtime, set the runtime to Node in this file or the app config.
// Example (uncomment if needed):
// export const runtime = 'nodejs';

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

    // If a SendGrid API key is provided, use SendGrid (recommended for Vercel)
    const  SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    if (SENDGRID_API_KEY) {
      const sgBody = {
        personalizations: [
          { to: [{ email: process.env.EMAIL_USER || '' }], subject: `Portfolio contact from ${name}` },
        ],
        from: { email: process.env.EMAIL_USER || 'noreply@example.com' },
        replyTo: { email },
        content: [{ type: 'text/plain', value: `From: ${name} <${email}>\n\n${message}` }],
      };

      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sgBody),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('SendGrid error:', res.status, text);
        return NextResponse.json({ error: 'SendGrid send failed' }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    // Otherwise fall back to SMTP via nodemailer. Validate SMTP env vars.
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error('Missing email credentials: set SENDGRID_API_KEY or EMAIL_USER and EMAIL_PASS in your environment');
      return NextResponse.json(
        { error: 'Email sending not configured. Missing credentials.' },
        { status: 500 }
      );
    }

    // Create transporter using explicit Gmail SMTP settings (secure)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Mail content for SMTP
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    };

    // Send email via SMTP
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

