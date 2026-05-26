import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { FadeIn } from '../FadeIn';
import { ComparisonTable } from './ComparisonTable';
import { ComparisonNarratives } from './ComparisonNarratives';

interface Props {
  isFreeProPlan: boolean;
}

export async function Comparison({ isFreeProPlan }: Props) {
  const t = await getTranslations('landing.comparison');

  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {t('subheading')}
            </p>
          </div>
        </FadeIn>

        <ComparisonTable isFreeProPlan={isFreeProPlan} />

        <p className="text-muted-foreground mt-4 text-center text-xs">
          {t('disclaimer')}
        </p>

        <FadeIn delay={0.1}>
          <ComparisonNarratives />
        </FadeIn>
      </Container>
    </section>
  );
}
