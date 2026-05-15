'use client';
import { useState } from 'react';
import type { InvitationDetails } from '@/modules/invitation/invitation.types';

interface Props {
  token: string;
  details: InvitationDetails;
  onAccepted: (jwtToken: string) => void;
}

export function ExistingUserAccept({ token, details, onAccepted }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/invitations/${token}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to accept invitation');
      onAccepted(data.token);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Accepting as{' '}
        <strong className="text-foreground">{details.email}</strong>
      </p>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        onClick={handleAccept}
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Accepting…' : 'Accept invitation'}
      </button>
    </div>
  );
}
