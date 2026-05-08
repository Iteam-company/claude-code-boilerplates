import { Check } from 'lucide-react';
import { Container } from '@/components/Container';

const without = [
  'Weeks of setup before writing a single feature',
  'Wrestling with servers, databases, and deployment configs',
  'Hiring a developer just to build a basic web app',
  'Claude generates different code every session',
  'Debugging infrastructure instead of building your product',
  'Re-explaining your project to Claude every conversation',
];

const with_ = [
  'Clone and start describing features in minutes',
  'Push to GitHub — Vercel deploys automatically, every time',
  'Serverless database scales with you, zero management',
  'Claude knows your project from the very first message',
  'User accounts, file uploads, and data tables ready out of the box',
  'Claude builds consistently — same patterns, every time',
];

export function LandingProblem() {
  return (
    <section className="border-border border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Building a web app shouldn&apos;t take months of setup.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">
            Most starters leave you fighting with infrastructure before you can
            build a single feature. This boilerplate skips all of that — Claude
            handles the code, Vercel handles the hosting, Neon handles the
            database.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-6">
            <p className="text-destructive mb-4 text-xs font-semibold tracking-wide uppercase">
              The usual way
            </p>
            <ul className="text-muted-foreground space-y-3 text-sm">
              {without.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="mb-4 text-xs font-semibold tracking-wide text-green-600 uppercase dark:text-green-400">
              With this boilerplate
            </p>
            <ul className="text-muted-foreground space-y-3 text-sm">
              {with_.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
