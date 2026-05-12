import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';

export async function Hero() {
  const t = await getTranslations('landing.hero');

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-foreground max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
            {t('headline')}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl">
            {t('subheadline')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ROUTES.SIGNUP}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 text-sm font-medium transition-colors"
            >
              {t('ctaPrimary')}
            </Link>
            <a
              href="#features"
              className={cn(
                'border-border text-foreground rounded-md border px-6 py-3 text-sm font-medium',
                'hover:bg-muted transition-colors',
              )}
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
