'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Container } from '@/components/Container';
import { EmailCaptureModal } from './EmailCaptureModal';
import { cn } from '@/lib/utils';

const STAR_THRESHOLD = 500;

function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

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

export function Hero() {
  const t = useTranslations('landing.hero');
  const [modal, setModal] = useState<'free' | 'pro' | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  const [spots, setSpots] = useState<{
    remaining: number;
    total: number;
  } | null>(null);
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    fetch('/api/spots')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.remaining === 'number' && typeof d.total === 'number') {
          setSpots({ remaining: d.remaining, total: d.total });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/Iteam-company/claude-code-boilerplates')
      .then((r) => r.json())
      .then(
        (d) =>
          typeof d.stargazers_count === 'number' &&
          setStars(d.stargazers_count),
      )
      .catch(() => {});
  }, []);

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
          <div className="border-border bg-muted text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <span>⚡</span>
            {t('badge')}
          </div>

          <h1 className="text-foreground max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            {t('headline')}
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl">
            {t('subheadline')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setModal('free')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 py-3 text-sm font-semibold transition-colors"
            >
              {t('ctaPrimary')}
            </button>
            <button
              onClick={() => setModal('pro')}
              className="border-border text-foreground hover:bg-muted rounded-md border px-8 py-3 text-sm font-semibold transition-colors"
            >
              {t('ctaSecondary')}
              {spots !== null && (
                <span className="text-muted-foreground ml-1.5 font-normal">
                  ({spots.remaining}/{spots.total} left)
                </span>
              )}
            </button>
          </div>

          <p className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-x-2 text-sm">
            <span>500+ developers</span>
            {stars !== null && stars >= STAR_THRESHOLD && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {formatStars(stars)} GitHub stars
                </span>
              </>
            )}
            <span>·</span>
            <span>Built on the stack used by Anthropic, Vercel, and Neon</span>
          </p>

          <div className="mt-16 w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-zinc-500">Claude Code</span>
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
                          : 'text-zinc-500'
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
