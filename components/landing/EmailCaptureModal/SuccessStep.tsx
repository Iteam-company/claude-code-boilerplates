'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2Icon } from 'lucide-react';

const FREE_REPO_URL =
  process.env.NEXT_PUBLIC_FREE_REPO_URL ??
  'https://github.com/Iteam-company/claude-code-boilerplate-free';
const PRO_REPO_URL =
  process.env.NEXT_PUBLIC_PRO_REPO_URL ??
  'https://github.com/Iteam-company/claude-code-boilerplate-pro';

interface Props {
  isFree: boolean;
  inviteSent?: boolean;
  email?: string;
  onClose: () => void;
}

export function SuccessStep({
  isFree,
  inviteSent = true,
  email,
  onClose,
}: Props) {
  const t = useTranslations('emailModal.successStep');
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);
  const [retried, setRetried] = useState(false);

  async function handleRetryInvite() {
    if (!email) return;
    setRetrying(true);
    try {
      const res = await fetch('/api/leads/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.inviteSent) setRetried(true);
    } finally {
      setRetrying(false);
    }
  }

  function handleContinue() {
    onClose();
    router.push('/docs/getting-started');
  }

  if (isFree) {
    return (
      <div className="text-center">
        <div className="text-3xl">{t('freeEmoji')}</div>
        <h2 className="text-foreground mt-3 text-lg font-semibold">
          {t('freeTitle')}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">{t('freeDesc')}</p>
        <div className="mt-5 flex flex-col gap-2">
          <a
            href={`${FREE_REPO_URL}/generate`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {t('freeRepoBtn')}
          </a>
          <button
            onClick={handleContinue}
            className="text-muted-foreground hover:text-foreground w-full px-4 py-2 text-sm transition-colors"
          >
            {t('button')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-3xl">{t('proEmoji')}</div>
      <h2 className="text-foreground mt-3 text-lg font-semibold">
        {t('proTitle')}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">{t('proDesc')}</p>

      {!inviteSent && !retried && (
        <div className="bg-muted mt-4 rounded-md p-3 text-sm">
          <p className="text-muted-foreground mb-2">{t('inviteFailedDesc')}</p>
          <button
            onClick={handleRetryInvite}
            disabled={retrying}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {retrying && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {t('retryInviteBtn')}
          </button>
        </div>
      )}

      {retried && (
        <p className="text-muted-foreground mt-4 text-sm">
          {t('inviteRetriedDesc')}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2">
        <a
          href={PRO_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('proRepoBtn')}
        </a>
        <button
          onClick={handleContinue}
          className="border-input text-foreground hover:bg-muted w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('button')}
        </button>
      </div>
    </div>
  );
}
