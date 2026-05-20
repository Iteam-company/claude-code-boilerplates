import { Container } from '@/components/Container';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Next.js 16 + React 19',
    description: 'Modern App Router setup',
  },
  {
    icon: '🗄️',
    title: 'Drizzle + Neon DB',
    description: 'Serverless Postgres with migrations',
  },
  {
    icon: '🔐',
    title: 'JWT auth',
    description: 'Login, register, verify, reset',
  },
  {
    icon: '💳',
    title: 'Stripe',
    description: 'Subscriptions + one-time + portal',
  },
  {
    icon: '📬',
    title: 'Resend + react-email',
    description: 'Transactional templates ready',
  },
  {
    icon: '☁️',
    title: 'Cloudinary uploads',
    description: 'Signed URLs included',
  },
  {
    icon: '🎨',
    title: 'Shadcn UI + Tailwind v4',
    description: '30+ components ready',
  },
  {
    icon: '🌗',
    title: 'Dark / light theme',
    description: 'Auto-switching',
  },
  {
    icon: '📝',
    title: 'MDX blog',
    description: 'SEO + OG images per post',
  },
  {
    icon: '🚀',
    title: 'Vercel deploy',
    description: 'Push to ship',
  },
  {
    icon: '🤖',
    title: 'Claude Code config',
    description: 'CLAUDE.md pre-loaded',
  },
  {
    icon: '🛠️',
    title: '10 core skills',
    description: 'The Claude Code starter pack',
  },
];

export function Features() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="text-foreground mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight md:text-4xl">
          Everything you&apos;d build in week 1 &mdash; already built.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, title, description }) => (
            <div
              key={title}
              className="border-border bg-muted/30 flex items-start gap-4 rounded-xl border p-5"
            >
              <span className="text-2xl leading-none">{icon}</span>
              <div>
                <p className="text-foreground text-sm font-semibold">{title}</p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
