import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';

export async function CTA() {
  const t = await getTranslations('landing.cta');

  return (
    <section className="relative overflow-hidden py-24">
      <div className="from-primary to-primary/80 absolute inset-0 bg-gradient-to-br" />
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-primary-foreground max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>
          <p className="text-primary-foreground/80 mt-4 max-w-xl text-lg">
            {t('subheading')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ROUTES.SIGNUP}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-md px-8 py-3 text-sm font-semibold transition-colors"
            >
              {t('button')}
            </Link>
            <a
              href="https://github.com/Iteam-company/claude-code-boilerplates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 rounded-md border px-8 py-3 text-sm font-semibold transition-colors"
            >
              {t('github')}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
