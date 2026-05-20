import { Container } from '@/components/Container';

const STEPS = [
  {
    number: '01',
    title: 'Clone & deploy',
    body: 'One command to clone, push to Vercel. Live URL in 10 minutes.',
    snippet: `$ git clone <repo> my-app
$ cd my-app && cp .env.example .env
$ vercel deploy --prod

✓ Live at https://my-app.vercel.app`,
  },
  {
    number: '02',
    title: 'Describe what you want',
    body: 'Tell Claude Code what to build. It scaffolds files using the patterns already in the repo.',
    snippet: `> add a dashboard with user analytics

✓ app/(main)/dashboard/page.tsx
✓ components/dashboard/AnalyticsChart.tsx
✓ hooks/api/useAnalytics.ts
✓ app/api/analytics/route.ts`,
  },
  {
    number: '03',
    title: 'Ship & iterate',
    body: 'Push to deploy. Add features by describing them. The boilerplate scales as the app grows.',
    snippet: `$ git add . && git commit -m "feat: analytics"
$ git push origin main

Deploying to production...
✓ https://my-app.vercel.app/dashboard`,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-foreground mx-auto max-w-xl text-center text-3xl font-bold tracking-tight md:text-4xl">
          From zero to shipped in 3 steps.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ number, title, body, snippet }) => (
            <div
              key={number}
              className="border-border bg-muted/20 flex flex-col rounded-2xl border p-6"
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
              <pre className="mt-6 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-300">
                {snippet}
              </pre>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
