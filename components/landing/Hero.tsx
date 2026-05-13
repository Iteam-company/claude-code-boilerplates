import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';

export async function Hero() {
  const t = await getTranslations('landing.hero');

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
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {t('badge')}
          </div>

          <h1 className="text-foreground max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            {t('headline')}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl">
            {t('subheadline')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ROUTES.SIGNUP}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 py-3 text-sm font-semibold transition-colors"
            >
              {t('ctaPrimary')}
            </Link>
            <a
              href="#features"
              className={cn(
                'border-border text-foreground rounded-md border px-8 py-3 text-sm font-semibold',
                'hover:bg-muted transition-colors',
              )}
            >
              {t('ctaSecondary')}
            </a>
          </div>

          <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span>✓ {t('trust1')}</span>
            <span>✓ {t('trust2')}</span>
            <span>✓ {t('trust3')}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
