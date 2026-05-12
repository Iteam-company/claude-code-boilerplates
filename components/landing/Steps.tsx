import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';

const STEP_KEYS = ['clone', 'configure', 'ship'] as const;

export async function Steps() {
  const t = await getTranslations('landing.steps');

  return (
    <section className="border-border border-b py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            {t('subheading')}
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {STEP_KEYS.map((key, i) => (
            <div key={key} className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                {i + 1}
              </div>
              <h3 className="text-foreground mt-6 text-lg font-semibold">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
