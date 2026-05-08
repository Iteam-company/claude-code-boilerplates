import { Container } from '@/components/Container';

const steps = [
  {
    step: '01',
    title: 'Clone the repository',
    description:
      'Clone the boilerplate and install dependencies. The full project structure is ready immediately.',
    code: 'git clone https://github.com/your/boilerplate\ncd boilerplate\npnpm install',
  },
  {
    step: '02',
    title: 'Configure environment',
    description:
      'Add your DATABASE_URL, JWT_SECRET, and MCP server tokens to .env. The template lists everything you need.',
    code: 'DATABASE_URL=postgres://...\nJWT_SECRET=your_secret\nNEON_API_KEY=...\nVERCEL_TOKEN=...',
  },
  {
    step: '03',
    title: 'Start building with Claude',
    description:
      'Run the dev server and open Claude Code. Skills and CLAUDE.md load automatically — Claude is ready from the first message.',
    code: 'pnpm dev\nclaude\n\n> "add a posts module with CRUD"',
  },
];

export function LandingSteps() {
  return (
    <section className="border-border bg-muted/40 border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Get started in minutes
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Clone, configure, and start building with Claude Code in three
            steps.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.step}>
              <div className="text-border mb-4 font-mono text-5xl font-bold">
                {step.step}
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {step.description}
              </p>
              <pre className="border-border bg-card text-foreground mt-4 overflow-x-auto rounded-lg border p-4 font-mono text-xs">
                {step.code}
              </pre>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
