'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Container } from '@/components/Container';
import { EmailCaptureModal } from './EmailCaptureModal';
import { cn } from '@/lib/utils';
import { STAR_THRESHOLD } from '@/lib/constants';
import { formatNumber } from '@/lib/format';

const TERMINAL_LINES = [
  {
    text: '$ claude "build a SaaS landing page with pricing"',
    type: 'command',
    delay: 1200,
  },
  { text: '  Reading project structure...', type: 'muted', delay: 600 },
  { text: '✓ Creating Hero + Pricing components', type: 'success', delay: 900 },
  { text: '✓ Wiring up Stripe checkout', type: 'success', delay: 700 },
  { text: '✓ Configuring auth + database', type: 'success', delay: 700 },
  { text: '✓ Deployed to Vercel', type: 'success', delay: 1100 },
  { text: '  → yourapp.vercel.app', type: 'url', delay: 400 },
] as const;

interface Props {
  stars?: number | null;
  spots?: { remaining: number; total: number } | null;
  isFreeProPlan?: boolean;
}

export function Hero({
  stars = null,
  spots = null,
  isFreeProPlan = true,
}: Props) {
  const t = useTranslations('landing.hero');
  const [modal, setModal] = useState<'free' | 'pro' | null>(null);
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const delay = TERMINAL_LINES[visibleLines - 1].delay;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />
      <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <div className="border-border bg-muted text-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <span>⚡</span>
            {isFreeProPlan ? t('badge') : t('badgePaid')}
          </div>

          <h1 className="text-foreground max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            {t('headline')}
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl">
            {isFreeProPlan ? t('subheadline') : t('subheadlinePaid')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setModal('free')}
              className="border-border text-foreground hover:bg-muted rounded-md border px-8 py-3 text-base font-semibold transition-colors"
            >
              {isFreeProPlan ? t('ctaPrimary') : t('ctaPrimaryPaid')}
            </button>
            <button
              onClick={() => setModal('pro')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 py-3 text-base font-semibold transition-colors"
            >
              {isFreeProPlan ? t('ctaSecondary') : t('ctaSecondaryPaid')}
              {!isFreeProPlan && (
                <span className="text-primary-foreground/70 ml-1.5 text-sm font-normal">
                  ($149)
                </span>
              )}
              {isFreeProPlan && spots !== null && (
                <span className="text-primary-foreground/70 ml-1.5 text-sm font-normal">
                  ({spots.remaining} left)
                </span>
              )}
            </button>
          </div>

          <p className="text-muted-foreground mt-4 flex flex-wrap items-center justify-center gap-x-1.5 text-xs">
            <span>{t('noCard')}</span>
            <span aria-hidden>·</span>
            <span>{t('mitLicense')}</span>
            <span aria-hidden>·</span>
            <span>{t('refund')}</span>
          </p>

          <p className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-x-2 text-sm">
            <span>{t('developers')}</span>
            {stars !== null && stars >= STAR_THRESHOLD && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {formatNumber(stars)} {t('githubStars')}
                </span>
              </>
            )}
            <span>·</span>
            <span>{t('stackCredit')}</span>
          </p>

          <div className="mt-16 w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-zinc-400">
                {t('terminalLabel')}
              </span>
            </div>
            <div className="min-h-40 p-6 text-left font-mono text-sm leading-relaxed">
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === 'command'
                      ? 'text-zinc-100'
                      : line.type === 'success'
                        ? 'text-green-400'
                        : line.type === 'url'
                          ? 'mt-2 text-blue-400'
                          : 'text-zinc-400'
                  }
                >
                  {line.text}
                </div>
              ))}
              <div
                className={cn(
                  'text-zinc-100',
                  visibleLines >= TERMINAL_LINES.length && 'mt-2',
                )}
              >
                {visibleLines >= TERMINAL_LINES.length && <span>$ </span>}
                <span className="inline-block h-3.5 w-0.5 animate-pulse bg-zinc-100 align-middle" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {modal && (
        <EmailCaptureModal plan={modal} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
