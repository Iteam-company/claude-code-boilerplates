import Link from 'next/link';
import { Container } from '@/components/Container';

export function LandingHero() {
  return (
    <section className="border-border border-b py-24 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="border-border bg-muted text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Open source · Free to use
          </div>

          <h1 className="text-foreground text-5xl font-bold tracking-tight md:text-7xl">
            Next.js boilerplate built for{' '}
            <span className="text-primary">Claude Code</span>
          </h1>

          <p className="text-muted-foreground mt-6 text-xl">
            12 pre-built skills, 3 MCP servers, full-stack auth, and Drizzle +
            Neon DB — all configured. Claude understands your architecture from
            the very first prompt.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com"
              className="bg-primary text-primary-foreground rounded-md px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              View on GitHub
            </Link>
            <Link
              href="#features"
              className="text-foreground text-sm font-semibold underline-offset-4 hover:underline"
            >
              See what&apos;s included →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
