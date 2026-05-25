'use client';

import { useTranslations } from 'next-intl';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function UpgradeStep({ onConfirm, onCancel }: Props) {
  const t = useTranslations('emailModal.upgradeStep');

  return (
    <div className="text-center">
      <div className="text-3xl">{t('emoji')}</div>
      <h2 className="text-foreground mt-3 text-lg font-semibold">
        {t('title')}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">{t('desc')}</p>
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={onConfirm}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('confirm')}
        </button>
        <button
          onClick={onCancel}
          className="border-input text-foreground hover:bg-muted w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}
