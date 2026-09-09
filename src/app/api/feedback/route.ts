import { put } from '@vercel/blob';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Feedback drop for the unlisted resource pages. Stores the note and an
// optional Markdown/text attachment in the project's Blob store under
// feedback/<page>/<timestamp>/, then emails Dan a copy with the attachment
// when RESEND_API_KEY is set. The store is the record; the email is the ping.

export const runtime = 'nodejs';

const MAX_TEXT = 20_000; // characters
const MAX_FILE = 2 * 1024 * 1024; // 2 MB
const ALLOWED = ['.md', '.txt', '.markdown'];

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80) || 'attachment.md';
}

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'not-configured' },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad-request' }, { status: 400 });
  }

  // Honeypot: real browsers leave it empty.
  if (String(form.get('website') || '').trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const page = String(form.get('page') || 'unknown').replace(/[^a-z0-9-]/gi, '-').slice(0, 60);
  const from = String(form.get('from') || '').trim().slice(0, 200);
  const note = String(form.get('note') || '').trim().slice(0, MAX_TEXT);
  const file = form.get('file');
  const hasFile = file instanceof File && file.size > 0;

  if (!note && !hasFile) {
    return NextResponse.json({ ok: false, error: 'empty' }, { status: 400 });
  }

  if (hasFile) {
    const f = file as File;
    const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
    if (!ALLOWED.includes(ext)) {
      return NextResponse.json({ ok: false, error: 'file-type' }, { status: 400 });
    }
    if (f.size > MAX_FILE) {
      return NextResponse.json({ ok: false, error: 'file-size' }, { status: 400 });
    }
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const base = `feedback/${page}/${stamp}`;
  const ua = req.headers.get('user-agent') || '';
  const country = req.headers.get('x-vercel-ip-country') || '';

  const meta = [
    `page: ${page}`,
    `received: ${new Date().toISOString()}`,
    `from: ${from || '(not given)'}`,
    `country: ${country || '(unknown)'}`,
    `user-agent: ${ua}`,
    '',
    note || '(no note; see attachment)',
    '',
  ].join('\n');

  let noteUrl = '';
  let fileUrl = '';
  try {
    const n = await put(`${base}/note.md`, meta, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'text/markdown; charset=utf-8',
    });
    noteUrl = n.url;
    if (hasFile) {
      const f = file as File;
      const u = await put(`${base}/${safeName(f.name)}`, f, {
        access: 'public',
        addRandomSuffix: true,
        contentType: 'text/markdown; charset=utf-8',
      });
      fileUrl = u.url;
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'store-failed' }, { status: 500 });
  }

  // Email is best-effort: a failure here never fails the submission.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.FEEDBACK_TO || 'dan@robson.studio';
      const fromAddr = process.env.FEEDBACK_FROM || 'Robson Studio <onboarding@resend.dev>';
      const attachments = hasFile
        ? [
            {
              filename: safeName((file as File).name),
              content: Buffer.from(await (file as File).arrayBuffer()).toString('base64'),
            },
          ]
        : undefined;
      const lines = [
        `Page: ${page}`,
        `From: ${from || '(not given)'}`,
        `Country: ${country || '(unknown)'}`,
        `Received: ${new Date().toISOString()}`,
        '',
        note || '(no note; see attachment)',
        '',
        `Stored: ${noteUrl}`,
        fileUrl ? `Attachment: ${fileUrl}` : '',
      ].join('\n');
      await resend.emails.send({
        from: fromAddr,
        to,
        subject: `Feedback on ${page}${from ? ` from ${from}` : ''}`,
        text: lines,
        attachments,
      });
    } catch {
      // Logged by Vercel; the store already has the submission.
    }
  }

  return NextResponse.json({ ok: true, emailed: Boolean(process.env.RESEND_API_KEY) });
}
