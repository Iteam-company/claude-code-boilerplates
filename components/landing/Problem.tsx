import { getTranslations } from 'next-intl/server';
import { Plug, DollarSign, Bot } from 'lucide-react';
import { Container } from '@/components/Container';
import { FadeIn } from './FadeIn';

const ICONS = [Plug, DollarSign, Bot];
const ITEM_KEYS = ['plumbing', 'cost', 'ai'] as const;

export async function Problem() {
  const t = await getTranslations('landing.problem');
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg">
              {t('subheading')}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {ITEM_KEYS.map((key, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={key}
                  className="border-border bg-muted/40 rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="text-muted-foreground h-6 w-6" />
                  <h3 className="text-foreground mt-4 text-base font-semibold">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {t(`items.${key}.body`)}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
