'use client';

import { Suspense } from 'react';
import { useVerifyEmail } from '@/hooks/api/verify-email';
import { ROUTES } from '@/lib/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { trigger, isMutating, error, data } = useVerifyEmail();
  const t = useTranslations('verifyEmail');

  useEffect(() => {
    if (token) trigger({ token });
  }, []);

  const status = isMutating
    ? 'loading'
    : data
      ? 'success'
      : error
        ? 'error'
        : token
          ? 'loading'
          : 'error';

  const errorMessage = !token ? t('missingToken') : error?.message;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 text-center shadow-sm">
        {status === 'loading' && (
          <>
            <h1 className="text-foreground mb-2 text-2xl font-semibold">
              {t('verifying')}
            </h1>
            <p className="text-muted-foreground text-sm">{t('pleaseWait')}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-foreground mb-2 text-2xl font-semibold">
              {t('verified')}
            </h1>
            <p className="text-muted-foreground mb-6 text-sm">
              {t('verifiedDescription')}
            </p>
            <button
              onClick={() => router.push(ROUTES.SIGNIN)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 text-sm font-medium transition-colors"
            >
              {t('signIn')}
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-foreground mb-2 text-2xl font-semibold">
              {t('failed')}
            </h1>
            <p className="text-muted-foreground mb-6 text-sm">{errorMessage}</p>
            <button
              onClick={() => router.push(ROUTES.SIGNIN)}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {t('backToSignIn')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
