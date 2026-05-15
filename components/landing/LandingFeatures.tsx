import {
  Rocket,
  Database,
  Shield,
  ImageIcon,
  FileText,
  Palette,
  GitBranch,
  Globe,
  MessageSquare,
  Zap,
  Users,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/Container';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MessageSquare,
    title: 'Just describe what you want',
    description:
      'Tell Claude "add a contact form" or "build a dashboard" — it knows your project and writes everything from scratch, correctly.',
  },
  {
    icon: GitBranch,
    title: 'Push to deploy, automatically',
    description:
      'Every git push goes live on Vercel. No deploy commands, no servers to manage — your app updates the moment you push.',
  },
  {
    icon: Database,
    title: 'Real database, zero setup',
    description:
      'Neon serverless Postgres is connected and ready. Claude can create tables, run migrations, and query data — just ask.',
  },
  {
    icon: Shield,
    title: 'User accounts built in',
    description:
      'Login, register, and protected pages are already wired up. Add user-specific features without touching auth logic.',
  },
  {
    icon: ImageIcon,
    title: 'Image uploads included',
    description:
      'Users can upload photos and files. Everything routes through Cloudinary — stored in the cloud, served fast worldwide.',
  },
  {
    icon: FileText,
    title: 'Any product type — MVP, SaaS, marketplace',
    description:
      "The structure works for whatever you're building. Claude adapts — dashboards, admin panels, landing pages, content sites, internal tools.",
  },
  {
    icon: Palette,
    title: 'Beautiful UI out of the box',
    description:
      'Dark and light mode, mobile-ready layout, and polished components. Your app looks professional from day one.',
  },
  {
    icon: Globe,
    title: 'Serverless — scales automatically',
    description:
      'No server to provision or maintain. Vercel and Neon scale with your traffic, and you only pay for what you use.',
  },
  {
    icon: Users,
    title: 'Claude never forgets your app',
    description:
      "Pre-loaded project instructions mean Claude understands your app's structure every session — no re-explaining.",
  },
  {
    icon: Zap,
    title: 'Features in minutes, not days',
    description:
      'Describe a feature, Claude scaffolds all the files. What used to take a developer a day takes a single conversation.',
  },
  {
    icon: RefreshCw,
    title: 'Consistent results every time',
    description:
      'Claude follows the same patterns on every build. No surprises, no drift — your app grows cleanly as you add features.',
  },
  {
    icon: Rocket,
    title: 'Production-ready from the start',
    description:
      'Not a toy starter — built with the same stack used in real products. Ready to hand off, scale, or keep building.',
  },
];

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="border-border bg-card rounded-xl border p-6 transition-shadow hover:shadow-md">
      <div className="bg-primary/10 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <h3 className="text-foreground font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}

export function LandingFeatures() {
  return (
    <section id="features" className="border-border border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Everything your app needs — already handled.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            From first feature to live deployment, the hard parts are already
            done for you.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
