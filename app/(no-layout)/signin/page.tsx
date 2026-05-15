'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignInForm } from '@/components/auth/SignInForm';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined' && token) router.replace(ROUTES.HOME);
  }, []);

  return (
    <AuthCard>
      <SignInForm redirectTo={searchParams.get('from') ?? undefined} />
    </AuthCard>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <AuthCard>
          <p className="text-muted-foreground text-center text-sm">Loading…</p>
        </AuthCard>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
