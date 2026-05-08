import Link from 'next/link';
import { Container } from '@/components/Container';

export function LandingCTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="border-border bg-card rounded-2xl border px-8 py-16 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Start building with Claude Code today
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Free and open source. Clone the repo and your Claude Code
            environment is ready in minutes — skills, MCP servers, and all.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com"
              className="bg-primary text-primary-foreground rounded-md px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Get started on GitHub
            </Link>
            <Link
              href="#features"
              className="text-foreground text-sm font-semibold underline-offset-4 hover:underline"
            >
              See all features →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
