import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';

export async function CTA() {
  const t = await getTranslations('landing.cta');

  return (
    <section className="bg-primary py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-primary-foreground max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>
          <p className="text-primary-foreground/80 mt-4 max-w-xl text-lg">
            {t('subheading')}
          </p>
          <Link
            href={ROUTES.SIGNUP}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 mt-10 rounded-md px-8 py-3 text-sm font-medium transition-colors"
          >
            {t('button')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
