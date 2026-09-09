'use client';

import { useState } from 'react';

// A prompt the reader copies whole. Native clipboard, no library.
export function CopyBlock({ text, label = 'Copy the prompt' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Selection fallback: the block is selectable text.
    }
  }

  return (
    <div
      className="squircle"
      style={{
        position: 'relative',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        padding: '1.125rem 1.25rem 1rem',
        marginTop: '0.75rem',
      }}
    >
      <pre
        style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--foreground)',
        }}
      >
        {text}
      </pre>
      <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={copy}
          className="pill"
          style={{
            padding: '0.5rem 1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : label}
        </button>
      </div>
    </div>
  );
}
