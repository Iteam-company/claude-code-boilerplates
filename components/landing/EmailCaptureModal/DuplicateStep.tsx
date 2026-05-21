'use client';

import { useTranslations } from 'next-intl';

interface Props {
  onClose: () => void;
}

export function DuplicateStep({ onClose }: Props) {
  const t = useTranslations('emailModal.duplicateStep');

  return (
    <div className="text-center">
      <div className="text-3xl">{t('emoji')}</div>
      <h2 className="text-foreground mt-3 text-lg font-semibold">
        {t('title')}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">{t('desc')}</p>
      <button
        onClick={onClose}
        className="border-input text-foreground hover:bg-muted mt-5 w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
      >
        {t('button')}
      </button>
    </div>
  );
}
