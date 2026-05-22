'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateGithub } from './validators';

interface Props {
  email: string;
  onNext: (username: string, requiresPayment: boolean) => void;
}

export function GithubStep({ email, onNext }: Props) {
  const t = useTranslations('emailModal.githubStep');
  const tValidation = useTranslations('emailModal.validation');

  const [github, setGithub] = useState('');
  const [githubError, setGithubError] = useState('');
  const [githubChecking, setGithubChecking] = useState(false);
  const [loading, setLoading] = useState(false);

  function resolveGithubError(value: string): string {
    const key = validateGithub(value);
    return key ? tValidation(key) : '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formatErr = resolveGithubError(github);
    if (formatErr) {
      setGithubError(formatErr);
      return;
    }

    setGithubChecking(true);
    setGithubError('');
    try {
      const res = await fetch(`/api/github/${encodeURIComponent(github)}`);
      if (res.status === 404) {
        setGithubError(tValidation('githubNotFound'));
        return;
      }
    } catch {
      // network error — don't block submission
    } finally {
      setGithubChecking(false);
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, githubUsername: github }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setGithubError(
          (data as { message?: string }).message ?? tValidation('submitError'),
        );
        return;
      }
      const data = await res.json();
      onNext(github, data.requiresPayment);
    } catch {
      setGithubError(tValidation('submitError'));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-foreground text-lg font-semibold">{t('title')}</h2>
      <p className="text-muted-foreground mt-1 text-sm">{t('desc')}</p>

      <div className="mt-5">
        <label className="text-foreground mb-1.5 block text-sm font-medium">
          {t('label')}
        </label>
        <div className="flex items-center">
          <span className="border-input bg-muted text-muted-foreground rounded-l-md border border-r-0 px-3 py-2 text-sm select-none">
            @
          </span>
          <input
            type="text"
            value={github}
            onChange={(e) => {
              setGithub(e.target.value);
              if (githubError)
                setGithubError(resolveGithubError(e.target.value));
            }}
            placeholder={t('placeholder')}
            autoFocus
            autoComplete="username"
            className={cn(
              'border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring flex-1 rounded-r-md border px-3 py-2 text-sm outline-none focus:ring-2',
              githubError && 'border-red-500 focus:ring-red-500/30',
            )}
          />
        </div>
        {githubChecking && (
          <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
            <Loader2Icon className="h-3 w-3 animate-spin" />
            {t('checking')}
          </p>
        )}
        {githubError && (
          <p className="mt-1 text-xs text-red-500">{githubError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || githubChecking || !github || !!githubError}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
      >
        {(loading || githubChecking) && (
          <Loader2Icon className="h-4 w-4 animate-spin" />
        )}
        {t('cta')}
      </button>
    </form>
  );
}
