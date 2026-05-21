'use client';

import { useTranslations } from 'next-intl';

interface Props {
  isFree: boolean;
  onClose: () => void;
}

export function SuccessStep({ isFree, onClose }: Props) {
  const t = useTranslations('emailModal.successStep');

  if (isFree) {
    return (
      <div className="text-center">
        <div className="text-3xl">{t('freeEmoji')}</div>
        <h2 className="text-foreground mt-3 text-lg font-semibold">
          {t('freeTitle')}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">{t('freeDesc')}</p>
        <button
          onClick={onClose}
          className="border-input text-foreground hover:bg-muted mt-5 w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('button')}
        </button>
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
      <button
        onClick={onClose}
        className="border-input text-foreground hover:bg-muted mt-5 w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
      >
        {t('button')}
      </button>
    </div>
  );
}
