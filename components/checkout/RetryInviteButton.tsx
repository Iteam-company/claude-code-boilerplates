'use client';

import { useState } from 'react';

interface Props {
  email: string;
}

export function RetryInviteButton({ email }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle',
  );

  async function handleRetry() {
    setStatus('loading');
    try {
      const res = await fetch('/api/leads/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.inviteSent ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p className="text-sm text-emerald-500">
        Invite resent — check your GitHub notifications.
      </p>
    );
  }

  return (
    <button
      onClick={handleRetry}
      disabled={status === 'loading'}
      className="border-border text-foreground hover:bg-muted rounded-md border px-5 py-2 text-sm font-medium disabled:opacity-50"
    >
      {status === 'loading'
        ? 'Sending…'
        : status === 'error'
          ? 'Could not send — try again'
          : 'Resend GitHub invite'}
    </button>
  );
}
