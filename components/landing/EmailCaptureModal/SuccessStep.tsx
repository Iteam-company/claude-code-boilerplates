'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL ?? '#';
const DISCORD_PRO_URL = process.env.NEXT_PUBLIC_DISCORD_PRO_URL ?? DISCORD_URL;

interface Props {
  isFree: boolean;
  onClose: () => void;
}

export function SuccessStep({ isFree, onClose }: Props) {
  const t = useTranslations('emailModal.successStep');
  const router = useRouter();

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
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-input text-foreground hover:bg-muted w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >
            {t('discordFree')}
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
      <div className="mt-5 flex flex-col gap-2">
        <a
          href={DISCORD_PRO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {t('discordPro')}
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
