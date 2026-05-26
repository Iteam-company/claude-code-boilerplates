'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/Container';
import { EmailCaptureModal } from './EmailCaptureModal';
import { useProSpots } from '@/hooks/api/useProSpots';

export function FinalCTA() {
  const t = useTranslations('landing.finalCta');
  const [modal, setModal] = useState<'free' | 'pro' | null>(null);
  const { isFreeProPlan } = useProSpots();

  return (
    <section className="bg-zinc-950 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {t('heading')}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">{t('subheading')}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setModal('free')}
              className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              {t('freeCta')}
            </button>
            <button
              onClick={() => setModal('pro')}
              className="rounded-md border border-zinc-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              {isFreeProPlan ? t('proCta') : t('proCtaPaid')}
            </button>
          </div>

          <p className="mt-8 text-sm text-zinc-400">{t('finePrint')}</p>
          <p className="mt-3 text-xs text-zinc-400 italic">{t('footnote')}</p>
        </div>
      </Container>

      {modal && (
        <EmailCaptureModal plan={modal} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
