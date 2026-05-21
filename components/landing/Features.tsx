import {
  Zap,
  Database,
  Lock,
  CreditCard,
  Mail,
  Cloud,
  Palette,
  SunMoon,
  FileText,
  Rocket,
  Bot,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/Container';
import { FadeIn } from './FadeIn';

interface Feature {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    Icon: Zap,
    title: 'Next.js 16 + React 19',
    description: 'Modern App Router setup',
  },
  {
    Icon: Database,
    title: 'Drizzle + Neon DB',
    description: 'Serverless Postgres with migrations',
  },
  {
    Icon: Lock,
    title: 'JWT auth',
    description: 'Login, register, verify, reset',
  },
  {
    Icon: CreditCard,
    title: 'Stripe',
    description: 'Subscriptions + one-time + portal',
  },
  {
    Icon: Mail,
    title: 'Resend + react-email',
    description: 'Transactional templates ready',
  },
  {
    Icon: Cloud,
    title: 'Cloudinary uploads',
    description: 'Signed URLs included',
  },
  {
    Icon: Palette,
    title: 'Shadcn UI + Tailwind v4',
    description: '30+ components ready',
  },
  { Icon: SunMoon, title: 'Dark / light theme', description: 'Auto-switching' },
  {
    Icon: FileText,
    title: 'MDX blog',
    description: 'SEO + OG images per post',
  },
  { Icon: Rocket, title: 'Vercel deploy', description: 'Push to ship' },
  {
    Icon: Bot,
    title: 'Claude Code config',
    description: 'CLAUDE.md pre-loaded',
  },
  {
    Icon: Wrench,
    title: '10 core skills',
    description: 'The Claude Code starter pack',
  },
];

export function Features() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <h2 className="text-foreground mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight md:text-5xl">
            Everything you&apos;d build in week 1 &mdash; already built.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="border-border bg-muted/30 flex items-start gap-4 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Icon className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
