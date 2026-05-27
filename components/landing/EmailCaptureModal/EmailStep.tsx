'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateEmail } from './validators';

export interface WaitlistResult {
  alreadyExists: boolean;
  requiresPayment: boolean;
  hasGithub: boolean;
  githubUsername?: string;
  isPro?: boolean;
}

interface Props {
  plan: 'free' | 'pro';
  isFreeProPlan?: boolean;
  onNext: (email: string, result: WaitlistResult) => void;
}

export function EmailStep({ plan, isFreeProPlan = true, onNext }: Props) {
  const t = useTranslations('emailModal.emailStep');
  const tValidation = useTranslations('emailModal.validation');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const isFree = plan === 'free';

  function resolveEmailError(value: string): string {
    const key = validateEmail(value);
    return key ? tValidation(key) : '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = resolveEmailError(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setLoading(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: plan }),
      });
      if (!res.ok) {
        setSubmitError(tValidation('submitError'));
        return;
      }
      const data: WaitlistResult = await res.json();
      onNext(email, data);
    } catch {
      setSubmitError(tValidation('submitError'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-foreground text-lg font-semibold">
        {isFree
          ? t('titleFree')
          : isFreeProPlan
            ? t('titlePro')
            : t('titleProPaid')}
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        {isFree
          ? t('descFree')
          : isFreeProPlan
            ? t('descPro')
            : t('descProPaid')}
      </p>

      <div className="mt-5">
        <label className="text-foreground mb-1.5 block text-left text-sm font-medium">
          {t('emailLabel')}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailError(resolveEmailError(email))}
          placeholder={t('emailPlaceholder')}
          inputMode="email"
          autoComplete="email"
          autoFocus
          className={cn(
            'border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2',
            emailError && 'border-red-500 focus:ring-red-500/30',
          )}
        />
        {emailError && (
          <p className="mt-1 text-left text-xs text-red-500">{emailError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !email}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
      >
        {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
        {isFree ? t('ctaFree') : isFreeProPlan ? t('ctaPro') : t('ctaProPaid')}
      </button>
      {submitError && (
        <p className="mt-2 text-center text-xs text-red-500">{submitError}</p>
      )}
    </form>
  );
}
