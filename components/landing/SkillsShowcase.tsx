'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

const CodeBlock = dynamic(() => import('./CodeBlock'), {
  ssr: false,
  loading: () => (
    <pre className="min-h-40 bg-[#0a0a0a] p-4 font-mono text-xs leading-relaxed text-zinc-300" />
  ),
});

interface Skill {
  id: string;
  name: string;
  description: string;
  trigger: string;
  output: string;
  language: string;
  pro?: boolean;
}

const SKILLS: Skill[] = [
  {
    id: 'feature-module',
    name: 'feature-module',
    description:
      'Generates a complete 7-file DDD-lite module: schema → relations → types → validation → repo → service → index.',
    trigger: 'add a comments feature',
    language: 'bash',
    output: `modules/comment/
├── comment.schema.ts     ← Drizzle table definition
├── comment.relations.ts  ← FK references + joins
├── comment.types.ts      ← inferred TypeScript types
├── comment.validation.ts ← Zod schemas (create / update)
├── comment.repo.ts       ← DB queries only, no logic
├── comment.service.ts    ← business logic + auth checks
└── index.ts              ← public API re-exports`,
  },
  {
    id: 'drizzle-migrate',
    name: 'drizzle-migrate',
    description:
      'Schema change to SQL migration in one step. Writes the schema, generates the migration, and walks you through applying it.',
    trigger: 'add a posts table with title, body, author_id, published_at',
    language: 'sql',
    output: `-- migrations/0003_add_posts.sql (auto-generated)
CREATE TABLE "posts" (
  "id"           serial PRIMARY KEY,
  "title"        text NOT NULL,
  "body"         text NOT NULL,
  "author_id"    integer NOT NULL REFERENCES "users"("id"),
  "published_at" timestamp,
  "created_at"   timestamp DEFAULT now() NOT NULL
);

$ npm run db:migrate  -- applied`,
  },
  {
    id: 'stripe-setup',
    name: 'stripe-setup',
    description:
      'Full Stripe flow: checkout session, webhook handler, customer portal — wired end to end with env vars documented.',
    trigger: 'set up stripe checkout for the pro plan',
    language: 'typescript',
    output: `// app/api/stripe/checkout/route.ts
export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: process.env.STRIPE_PRICE_PRO, quantity: 1 }],
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=1\`,
    cancel_url:  \`\${process.env.NEXT_PUBLIC_BASE_URL}/pricing\`,
  });
  return Response.json({ url: session.url });
}`,
  },
  {
    id: 'email-setup',
    name: 'email-setup',
    description:
      'Resend + react-email: scaffolds the template, wires it into the service layer, and documents the env vars needed.',
    trigger: 'send a welcome email when a user signs up',
    language: 'tsx',
    output: `// emails/WelcomeEmail.tsx (scaffolded)
export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html><Body>
      <Heading>Welcome, {name}</Heading>
      <Button href={process.env.NEXT_PUBLIC_BASE_URL}>
        Open dashboard
      </Button>
    </Body></Html>
  );
}

// user.service.ts — called after register()
await emailService.sendEmail({
  to: user.email,
  subject: 'Welcome',
  react: React.createElement(WelcomeEmail, { name: user.name }),
});`,
  },
  {
    id: 'multi-tenancy',
    name: 'multi-tenancy',
    description:
      'Organization + member + invitation modules with a full role hierarchy: owner → admin → member.',
    trigger: 'add organization support with invite links',
    language: 'typescript',
    pro: true,
    output: `// Three new modules scaffolded:
modules/organization/   ← slug auto-generated from name
modules/orgMember/      ← roles: owner | admin | member
modules/invitation/     ← token-based, no-auth accept route

// Org context flows via header on every request:
const orgId = req.headers.get('X-Org-Id');
const member = await orgMemberService.requireMember(
  user.id, orgId, ['owner', 'admin']  // role guard
);`,
  },
  {
    id: 'claude-feature',
    name: 'claude-feature',
    description:
      'Streaming AI chat: SSE route, credit deduction before calling Claude, and a useAiChat hook — all wired end to end.',
    trigger: 'add a streaming AI assistant to the dashboard',
    language: 'typescript',
    pro: true,
    output: `// app/api/ai/chat/route.ts
export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  await creditService.deduct(user.id);  // 402 if out of credits

  const stream = await claude.messages.stream({
    model: 'claude-opus-4-7',
    system: cachedSystem(SYSTEM_PROMPT),
    messages: body.messages,
  });
  return new Response(stream.toReadableStream(), {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}`,
  },
];

export function SkillsShowcase() {
  const [active, setActive] = useState(SKILLS[0].id);
  const skill = SKILLS.find((s) => s.id === active)!;

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            40+ Claude Code skills your Claude already knows.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Skills are pre-loaded knowledge that turn &ldquo;how do I do
            X&rdquo; into &ldquo;do X&rdquo;. Every skill is a tested pattern
            from real production projects.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          {/* Tab bar */}
          <div className="overflow-x-auto border-b border-zinc-800">
            <div className="flex min-w-max px-4">
              {SKILLS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    'flex items-center gap-1.5 border-b-2 px-4 py-3.5 font-mono text-xs whitespace-nowrap transition-colors',
                    active === s.id
                      ? 'border-sky-400 text-sky-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200',
                  )}
                >
                  /{s.name}
                  {s.pro && (
                    <span className="rounded bg-amber-500/20 px-1 py-0.5 font-sans text-[10px] font-semibold text-amber-400">
                      PRO
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-zinc-300">
              {skill.description}
            </p>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                You type
              </p>
              <div className="flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="font-mono text-sm text-sky-400">›</span>
                <span className="font-mono text-sm text-zinc-200">
                  {skill.trigger}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                Claude scaffolds
              </p>
              <div className="overflow-hidden rounded-lg border border-zinc-800">
                <CodeBlock language={skill.language} code={skill.output} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
