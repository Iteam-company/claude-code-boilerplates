import { getTranslations } from 'next-intl/server';
import { highlightCode } from '@/lib/highlight';
import { SkillsShowcaseTabs } from './SkillsShowcaseTabs';

const SKILLS = [
  {
    id: 'feature-module',
    name: 'feature-module',
    translationKey: 'featureModule',
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
    translationKey: 'drizzleMigrate',
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
    translationKey: 'stripeSetup',
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
    translationKey: 'emailSetup',
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
    translationKey: 'multiTenancy',
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
    translationKey: 'claudeFeature',
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

export async function SkillsShowcase() {
  const t = await getTranslations('landing.skillsShowcase');
  const tSkills = await getTranslations('landing.skillsShowcase.skills');

  const skills = await Promise.all(
    SKILLS.map(async (s) => ({
      id: s.id,
      name: s.name,
      pro: s.pro,
      description: tSkills(`${s.translationKey}.description`),
      trigger: tSkills(`${s.translationKey}.trigger`),
      html: await highlightCode(s.output, s.language),
    })),
  );

  return (
    <SkillsShowcaseTabs
      skills={skills}
      heading={t('heading')}
      subheading={t('subheading')}
      youType={t('youType')}
      claudeScaffolds={t('claudeScaffolds')}
      proBadge={t('proBadge')}
    />
  );
}
