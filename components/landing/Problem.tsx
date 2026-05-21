import { Plug, DollarSign, Bot } from 'lucide-react';
import { Container } from '@/components/Container';
import { FadeIn } from './FadeIn';

const PAIN_POINTS = [
  {
    Icon: Plug,
    title: 'Plumbing first',
    body: 'Two weeks gone to auth, Stripe, email, multi-tenancy — before your idea ships.',
  },
  {
    Icon: DollarSign,
    title: '$199 just to start',
    body: "Every boilerplate charges $199–$1,124 before you've validated a single feature.",
  },
  {
    Icon: Bot,
    title: 'AI bolted on',
    body: 'AI is a feature on most starters. On this one, Claude Code is the workflow.',
  },
];

export function Problem() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              You&apos;ve wired up Stripe, auth, and email for the 4th time.
              You&apos;re tired.
            </h2>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg">
              Every new SaaS starts with the same 2 weeks of plumbing. Webhooks.
              Password reset flows. Customer portals. Multi-tenancy. By the time
              you ship the actual product idea, the spark is gone.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PAIN_POINTS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="border-border bg-muted/40 rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Icon className="text-muted-foreground h-6 w-6" />
                <h3 className="text-foreground mt-4 text-base font-semibold">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
