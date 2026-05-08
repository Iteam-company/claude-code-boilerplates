import Link from 'next/link';
import { Container } from '@/components/Container';

export function LandingHero() {
  return (
    <section className="border-border border-b py-24 md:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="border-border bg-muted text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Free &amp; open source
          </div>

          <h1 className="text-foreground text-5xl font-bold tracking-tight md:text-7xl">
            Describe your app.{' '}
            <span className="text-primary">Claude builds it.</span>
          </h1>

          <p className="text-muted-foreground mt-6 text-xl">
            Building an MVP, a SaaS, or a marketplace? Clone once, describe what
            you want, and push to go live on Vercel. Serverless database
            included, no DevOps required.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com/Iteam-company/claude-code-boilerplates"
              className="bg-primary text-primary-foreground rounded-md px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Get started on GitHub
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
