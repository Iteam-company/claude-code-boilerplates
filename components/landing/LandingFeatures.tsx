import {
  Zap,
  Code2,
  Database,
  Shield,
  Blocks,
  BookOpen,
  Cpu,
  Bot,
  Server,
  Layers,
  FileText,
  Palette,
} from 'lucide-react';
import { Container } from '@/components/Container';

const features = [
  {
    icon: Bot,
    title: '12 Claude Code skills',
    description:
      'Pre-built skills for modules, routes, auth, migrations, hooks, deployments, and more. Triggered automatically by what you ask.',
  },
  {
    icon: Server,
    title: '3 MCP servers configured',
    description:
      'Neon, Vercel, and Cloudinary connected in .mcp.json. Claude can query your DB, inspect deployments, and upload assets without leaving the session.',
  },
  {
    icon: BookOpen,
    title: 'CLAUDE.md project instructions',
    description:
      'Detailed architecture rules so Claude never invents its own patterns. Every convention documented — naming, structure, anti-patterns.',
  },
  {
    icon: Layers,
    title: 'DDD-lite module structure',
    description:
      'Schema → Relations → Types → Validation → Repo → Service → Index. Claude scaffolds all 7 files from a single instruction.',
  },
  {
    icon: Shield,
    title: 'JWT authentication',
    description:
      'Register, login, protected routes, and ownership checks wired up. getUserFromRequest() enforced at the route layer.',
  },
  {
    icon: Database,
    title: 'Drizzle ORM + Neon DB',
    description:
      'Serverless Postgres with typed queries, relations, and migrations. db:generate, db:migrate, db:push all configured.',
  },
  {
    icon: Code2,
    title: 'Thin API route pattern',
    description:
      'Validate → service → respond. Business logic lives in the service layer. Routes stay clean and testable.',
  },
  {
    icon: Zap,
    title: 'SWR data-fetching hooks',
    description:
      'Auth-aware fetcher with Authorization header included. Typed useSWR and useSWRMutation patterns ready to generate.',
  },
  {
    icon: Blocks,
    title: 'Zod validation everywhere',
    description:
      'Schemas for all inputs. safeParse enforced. Client schema fields only — no authorId, id, or timestamps from the client.',
  },
  {
    icon: Palette,
    title: 'Tailwind v4 + shadcn UI',
    description:
      'CSS-first theming, dark/light mode via next-themes, 20+ shadcn components pre-installed. Customize only in globals.css.',
  },
  {
    icon: Cpu,
    title: 'Cloudinary image uploads',
    description:
      'Upload API route, upload hook, and ImageUpload component. Secured, typed, and returns both url and publicId.',
  },
  {
    icon: FileText,
    title: 'MDX blog support',
    description:
      'next-mdx-remote with serialize pattern, prose styling via @tailwindcss/typography, and Server Component blog pages.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="border-border border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Everything pre-configured. Nothing to figure out.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Every pattern Claude needs to build your product is already
            documented, enforced, and ready to use.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="border-border bg-card rounded-xl border p-6 transition-shadow hover:shadow-md"
              >
                <div className="bg-primary/10 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-foreground font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
