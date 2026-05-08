import { Container } from '@/components/Container';

const steps = [
  {
    step: '01',
    title: 'Clone and open',
    description:
      'Download the boilerplate, add your API keys to a single config file, and start the app. Takes about five minutes.',
    lines: [
      'git clone https://github.com/your/boilerplate',
      'cd boilerplate',
      'npm install && npm run dev',
    ],
  },
  {
    step: '02',
    title: 'Describe what you want to build',
    description:
      'Open Claude Code and tell it what your app needs. Claude reads your project and writes all the code — you never touch the internals.',
    lines: [
      'claude',
      '',
      '> "add a contact form with email and message"',
      '> "make the dashboard page login-only"',
      '> "add a pricing page with three plans"',
    ],
  },
  {
    step: '03',
    title: "Push — and it's live",
    description:
      'Push your changes to GitHub. Vercel picks it up automatically and deploys your app to a real URL within seconds.',
    lines: ['git add .', 'git commit -m "add contact form"', 'git push'],
  },
];

function TerminalWindow({ lines }: { lines: string[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 font-mono text-xs">
      <div className="flex items-center gap-1.5 border-b border-zinc-700 bg-zinc-900 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>
      <div className="overflow-x-auto p-4">
        {lines.map((line, i) =>
          line === '' ? (
            <div key={i} className="h-3" />
          ) : (
            <div key={i} className="flex gap-2">
              <span className="text-zinc-500 select-none">$</span>
              <span className="text-zinc-100">{line}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function LandingSteps() {
  return (
    <section className="border-border bg-muted/40 border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            From idea to live app in three steps
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            No DevOps. No configuration rabbit holes. Just describe, build, and
            ship.
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
              <TerminalWindow lines={step.lines} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
