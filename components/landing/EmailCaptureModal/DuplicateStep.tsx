'use client';

import { useTranslations } from 'next-intl';

const FREE_REPO_URL =
  process.env.NEXT_PUBLIC_FREE_REPO_URL ??
  'https://github.com/Iteam-company/claude-code-boilerplate-free';
const PRO_REPO_URL =
  process.env.NEXT_PUBLIC_PRO_REPO_URL ??
  'https://github.com/Iteam-company/claude-code-boilerplate-pro';

interface Props {
  isFree: boolean;
  onClose: () => void;
}

export function DuplicateStep({ isFree, onClose }: Props) {
  const t = useTranslations('emailModal.duplicateStep');
  const repoUrl = isFree ? FREE_REPO_URL : PRO_REPO_URL;

  return (
    <div className="text-center">
      <div className="text-3xl">{t('emoji')}</div>
      <h2 className="text-foreground mt-3 text-lg font-semibold">
        {t('title')}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">{t('desc')}</p>
      <div className="mt-5 flex flex-col gap-2">
        <a
          href={`${repoUrl}/generate`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('createRepoBtn')}
        </a>
        <button
          onClick={onClose}
          className="border-input text-foreground hover:bg-muted w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('button')}
        </button>
      </div>
    </div>
  );
}
