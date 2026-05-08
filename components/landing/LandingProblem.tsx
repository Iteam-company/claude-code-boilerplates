import { Check } from 'lucide-react';
import { Container } from '@/components/Container';

const without = [
  'Write CLAUDE.md from scratch every project',
  'Claude generates inconsistent module structures',
  'MCP servers not configured — no DB or deploy context',
  'No skills — Claude forgets your patterns mid-session',
  'Spend days setting up auth, DB, and validation',
  'Claude writes raw fetch instead of your SWR patterns',
];

const with_ = [
  'CLAUDE.md pre-written with your full architecture',
  'Skills enforce DDD-lite patterns on every module',
  'Neon, Vercel, Cloudinary MCPs ready in .mcp.json',
  '12 skills cover the entire development workflow',
  'Auth, DB, validation, and hooks wired from day one',
  'Claude generates your exact SWR + fetcher pattern',
];

export function LandingProblem() {
  return (
    <section className="border-border border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Claude Code is powerful. But only once it knows your codebase.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">
            Without a CLAUDE.md, skills, or MCP servers — Claude invents its own
            patterns, breaks your architecture, and forgets context between
            sessions. This boilerplate solves that completely.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-6">
            <p className="text-destructive mb-4 text-xs font-semibold tracking-wide uppercase">
              Without this boilerplate
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
