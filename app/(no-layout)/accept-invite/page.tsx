'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import type { InvitationDetails } from '@/modules/invitation/invitation.types';
import { AuthCard } from '@/components/auth/AuthCard';
import { NewUserInviteForm } from '@/components/invitation/NewUserInviteForm';
import { ExistingUserAccept } from '@/components/invitation/ExistingUserAccept';

function AcceptInviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuth();

  const token = searchParams.get('token');
  const [details, setDetails] = useState<InvitationDetails | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/invitations/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error)
          setLoadError('This invitation is invalid or has expired.');
        else setDetails(data);
      })
      .catch(() => setLoadError('Failed to load invitation.'));
  }, [token]);

  const handleAccepted = (jwtToken: string) => {
    setToken(jwtToken);
    router.push(ROUTES.DEMO_DASHBOARD);
  };

  return (
    <AuthCard>
      {!token || loadError ? (
        <p className="text-center text-sm text-red-600">
          {!token ? 'Invalid invitation link.' : loadError}
        </p>
      ) : !details ? (
        <p className="text-muted-foreground text-center text-sm">
          Loading invitation…
        </p>
      ) : (
        <>
          <h1 className="text-foreground mb-2 text-center text-2xl font-semibold">
            You&apos;re invited
          </h1>
          <p className="text-muted-foreground mb-6 text-center text-sm">
            Join{' '}
            <strong className="text-foreground">
              {details.organization.name}
            </strong>{' '}
            as <span className="capitalize">{details.role}</span>
          </p>
          {details.isNewUser ? (
            <NewUserInviteForm
              token={token}
              details={details}
              onAccepted={handleAccepted}
            />
          ) : (
            <ExistingUserAccept
              token={token}
              details={details}
              onAccepted={handleAccepted}
            />
          )}
        </>
      )}
    </AuthCard>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <AuthCard>
          <p className="text-muted-foreground text-center text-sm">Loading…</p>
        </AuthCard>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
