'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/Container';
import { EmailCaptureModal } from './EmailCaptureModal';

const VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? null;

export function Demo() {
  const t = useTranslations('landing.demo');
  const [modal, setModal] = useState(false);

  if (!VIDEO_URL) return null;

  const isLoom = VIDEO_URL.includes('loom.com');

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-foreground text-center text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            {isLoom ? (
              <div className="relative aspect-video">
                <iframe
                  src={VIDEO_URL}
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                />
              </div>
            ) : (
              <video
                src={VIDEO_URL}
                className="w-full"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-sm">{t('subtext')}</p>
            <button
              onClick={() => setModal(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 py-3 text-sm font-semibold transition-colors"
            >
              {t('cta')}
            </button>
          </div>
        </div>
      </Container>

      {modal && (
        <EmailCaptureModal plan="free" onClose={() => setModal(false)} />
      )}
    </section>
  );
}
