'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

const ERRORS: Record<string, string> = {
  empty: 'Add a note or attach a file first.',
  'file-type': 'Attach a .md or .txt file.',
  'file-size': 'Keep the file under 2 MB.',
  'store-failed': "Couldn't save that. Try again, or email it.",
  'bad-request': "Couldn't read that. Try again.",
};

export function FeedbackForm({ page, mailto }: { page: string; mailto: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('page', page);
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/feedback', { method: 'POST', body: data });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.status === 503) {
        setStatus('unconfigured');
        return;
      }
      if (!res.ok || !body.ok) {
        setStatus('error');
        setMessage(ERRORS[body.error || ''] || "Couldn't send that. Try again.");
        return;
      }
      setStatus('sent');
      form.reset();
      setFileName('');
    } catch {
      setStatus('error');
      setMessage("Couldn't reach the server. Try again, or email it.");
    }
  }

  const field: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9375rem',
    lineHeight: 1.5,
    color: 'var(--foreground)',
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-control)',
    padding: '0.75rem 0.875rem',
    outline: 'none',
  };

  const label: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--foreground)',
    marginBottom: '0.375rem',
  };

  if (status === 'sent') {
    return (
      <p
        className="squircle"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9375rem',
          padding: '1rem 1.125rem',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
        }}
      >
        Received. Thank you.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="fb-note" style={label}>
          Feedback
        </label>
        <textarea
          id="fb-note"
          name="note"
          rows={6}
          maxLength={20000}
          placeholder="What worked, what did not, what you stopped using."
          style={{ ...field, resize: 'vertical' }}
        />
      </div>

      <div>
        <label htmlFor="fb-file" style={label}>
          Attach a file <span style={{ fontWeight: 400, color: 'var(--muted-foreground)' }}>(optional, .md or .txt, under 2 MB)</span>
        </label>
        <input
          id="fb-file"
          name="file"
          type="file"
          accept=".md,.txt,.markdown,text/markdown,text/plain"
          onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name || '')}
          style={{ ...field, padding: '0.5rem 0.875rem', cursor: 'pointer' }}
        />
        {fileName && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginTop: '0.375rem' }}>
            {fileName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fb-from" style={label}>
          Your name <span style={{ fontWeight: 400, color: 'var(--muted-foreground)' }}>(optional)</span>
        </label>
        <input id="fb-from" name="from" type="text" maxLength={200} autoComplete="name" style={field} />
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="fb-website">Website</label>
        <input id="fb-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="pill"
          style={{
            padding: '0.8125rem 1.5rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            boxShadow: 'var(--shadow-sm)',
            border: 'none',
            cursor: status === 'sending' ? 'wait' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          {status === 'sending' ? 'Sending' : 'Send feedback'}
        </button>
        {status === 'error' && (
          <span role="alert" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--primary)' }}>
            {message}
          </span>
        )}
        {status === 'unconfigured' && (
          <span role="alert" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
            The form is not wired up yet. Email it instead:{' '}
            <a href={mailto} style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '0.1875rem' }}>
              dan@robson.studio
            </a>
          </span>
        )}
      </div>
    </form>
  );
}
