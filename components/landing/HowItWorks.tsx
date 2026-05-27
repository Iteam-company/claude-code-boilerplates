import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { TerminalSnippet } from './TerminalSnippet';
import { FadeIn } from './FadeIn';
import { highlightCode } from '@/lib/highlight';

const STEP_KEYS = ['clone', 'describe', 'ship'] as const;

const STEP_SNIPPETS = [
  `# Click "Create new repo" on GitHub
✓ github.com/you/my-app created from template

$ git clone https://github.com/you/my-app
$ npm install && cp .env.example .env`,
  `> add a dashboard with user analytics

✓ app/(main)/dashboard/page.tsx
✓ components/dashboard/AnalyticsChart.tsx
✓ hooks/api/useAnalytics.ts
✓ app/api/analytics/route.ts`,
  `$ git add . && git commit -m "feat: analytics"
$ git push origin main

Deploying to production...
✓ https://my-app.vercel.app/dashboard`,
];

const STEP_NUMBERS = ['01', '02', '03'];

export async function HowItWorks() {
  const t = await getTranslations('landing.howItWorks');

  const steps = await Promise.all(
    STEP_KEYS.map(async (key, i) => ({
      key,
      number: STEP_NUMBERS[i],
      title: t(`steps.${key}.title`),
      body: t(`steps.${key}.body`),
      html: await highlightCode(STEP_SNIPPETS[i], 'bash'),
    })),
  );

  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <h2 className="text-foreground mx-auto max-w-xl text-center text-4xl font-bold tracking-tight md:text-5xl">
            {t('heading')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ key, number, title, body, html }) => (
              <div
                key={key}
                className="border-border bg-muted/20 flex min-w-0 flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-primary font-mono text-4xl leading-none font-bold">
                  {number}
                </span>
                <h3 className="text-foreground mt-4 text-base font-semibold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {body}
                </p>
                <TerminalSnippet html={html} />
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
