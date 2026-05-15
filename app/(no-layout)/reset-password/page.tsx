'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AuthCard } from '@/components/auth/AuthCard';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const t = useTranslations('resetPassword');

  if (!token) {
    return (
      <AuthCard>
        <div className="text-center">
          <h1 className="text-foreground mb-2 text-2xl font-semibold">
            {t('invalidLink')}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('invalidLinkDescription')}
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <ResetPasswordForm token={token} />
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthCard>
          <p className="text-muted-foreground text-center text-sm">Loading…</p>
        </AuthCard>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
