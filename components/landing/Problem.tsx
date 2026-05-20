import { Container } from '@/components/Container';

const PAIN_POINTS = [
  {
    icon: '🔌',
    title: 'Plumbing first',
    body: 'Two weeks gone to auth, Stripe, email, multi-tenancy — before your idea ships.',
  },
  {
    icon: '💸',
    title: '$199 just to start',
    body: "Every boilerplate charges $199–$1,124 before you've validated a single feature.",
  },
  {
    icon: '🤖',
    title: 'AI bolted on',
    body: 'AI is a feature on most starters. On this one, Claude Code is the workflow.',
  },
];

export function Problem() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            You&apos;ve wired up Stripe, auth, and email for the 4th time.
            You&apos;re tired.
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg">
            Every new SaaS starts with the same 2 weeks of plumbing. Webhooks.
            Password reset flows. Customer portals. Multi-tenancy. By the time
            you ship the actual product idea, the spark is gone.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PAIN_POINTS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="border-border bg-muted/40 rounded-xl border p-6"
            >
              <div className="text-3xl">{icon}</div>
              <h3 className="text-foreground mt-4 text-base font-semibold">
                {title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
