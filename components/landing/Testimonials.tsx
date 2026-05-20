import { Container } from '@/components/Container';
import { cn } from '@/lib/utils';

const AVATARS = [
  { initials: 'AK', color: 'bg-violet-500' },
  { initials: 'MR', color: 'bg-sky-500' },
  { initials: 'JL', color: 'bg-emerald-500' },
  { initials: 'SB', color: 'bg-amber-500' },
  { initials: 'TN', color: 'bg-rose-500' },
  { initials: 'PW', color: 'bg-indigo-500' },
  { initials: 'EC', color: 'bg-teal-500' },
  { initials: 'DM', color: 'bg-orange-500' },
];

const STACK_COLORS: Record<string, string> = {
  'JWT auth': 'bg-violet-500/10 text-violet-400',
  Stripe: 'bg-emerald-500/10 text-emerald-400',
  'Claude module': 'bg-sky-500/10 text-sky-400',
  'MDX blog': 'bg-amber-500/10 text-amber-400',
  Drizzle: 'bg-rose-500/10 text-rose-400',
  Email: 'bg-indigo-500/10 text-indigo-400',
};

const CASE_STUDY = {
  name: 'Alex Kim',
  role: 'Founder, Paperflow AI',
  stack: ['JWT auth', 'Stripe', 'Claude module', 'Email'],
  quote:
    'I cloned this on a Monday. By Wednesday I had auth, Stripe checkout, and a streaming Claude assistant live in production. The skills mean I just describe what I want — Claude Code already knows the patterns in the repo. What normally takes a week took two days.',
  outcome: 'Production-ready SaaS in 2 days',
};

export function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            From the first 100 founders who shipped.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Early builders shipping real products with this boilerplate.
          </p>
        </div>

        {/* Avatar stack */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center">
            {AVATARS.map((a, i) => (
              <div
                key={a.initials}
                className={cn(
                  'border-background flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold text-white',
                  a.color,
                  i !== 0 && '-ml-3',
                )}
                style={{ zIndex: AVATARS.length - i }}
              >
                {a.initials}
              </div>
            ))}
            <div
              className="bg-muted border-border text-muted-foreground -ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 text-[10px] font-semibold"
              style={{ zIndex: 0 }}
            >
              500+
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            500+ developers have cloned this boilerplate
          </p>
        </div>

        {/* Case study */}
        <div className="border-border bg-muted/20 mx-auto mt-12 max-w-2xl rounded-2xl border p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
              {CASE_STUDY.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-foreground font-semibold">{CASE_STUDY.name}</p>
              <p className="text-muted-foreground text-sm">{CASE_STUDY.role}</p>
            </div>
            <span className="ml-auto rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold whitespace-nowrap text-emerald-400">
              {CASE_STUDY.outcome}
            </span>
          </div>

          <blockquote className="text-foreground mt-6 text-base leading-relaxed">
            &ldquo;{CASE_STUDY.quote}&rdquo;
          </blockquote>

          <div className="mt-6 flex flex-wrap gap-2">
            {CASE_STUDY.stack.map((item) => (
              <span
                key={item}
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-medium',
                  STACK_COLORS[item] ?? 'bg-muted text-muted-foreground',
                )}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
