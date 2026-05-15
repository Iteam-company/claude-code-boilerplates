'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined' && token) router.replace(ROUTES.HOME);
  }, []);

  return (
    <AuthCard>
      <SignUpForm redirectTo={searchParams.get('from') ?? undefined} />
    </AuthCard>
  );
}
