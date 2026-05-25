import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { FAQAccordion } from './FAQAccordion';
import { FadeIn } from './FadeIn';

const FAQ_KEYS = [
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
  'q6',
  'q7',
  'q8',
  'q9',
  'q10',
  'q11',
  'q12',
  'q13',
  'q14',
  'q15',
] as const;

export async function FAQ() {
  const t = await getTranslations('landing.faq');

  const items = FAQ_KEYS.map((key) => ({
    key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-muted py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/<\//g, '<\\/'),
        }}
      />
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              {t('heading')}
            </h2>
          </div>
        </FadeIn>
        <FAQAccordion items={items} />
      </Container>
    </section>
  );
}
