# Claude Code Boilerplate -- Next.js Full-Stack SaaS Starter with AI-Assisted Development

A production-ready Next.js 16 + Neon DB starter pre-wired for Claude Code. Skip the boilerplate setup and start shipping features on day one -- auth, payments, blog, email, file uploads, and AI chat are already built in.

## What problem does this solve?

Every new SaaS project starts the same way: wire up authentication, add a database, configure Stripe, set up email, integrate file uploads, and then finally write the feature you actually wanted to build. This boilerplate does all of that before you write a single line of code.

It also solves the "Claude Code doesn't know my conventions" problem. The `.claude/` folder ships with a detailed `CLAUDE.md`, 22 ready-to-use skills, safety hooks, and sub-agents -- so Claude Code understands your stack from the first prompt and you never have to explain your folder structure or naming conventions again.

## Who is this for?

- Developers building a **multi-tenant SaaS** who want auth, roles, and billing pre-wired
- Teams using **Claude Code** who want a starting point with mature AI-assisted development workflows
- Engineers who want a **full-stack Next.js App Router** project with real DDD-lite architecture, not a toy example
- Anyone who's built `create-next-app` projects and spent the first week writing the same auth/payments boilerplate every time

## Why not create-next-app?

`create-next-app` gives you a blank canvas. This gives you a production-grade foundation with:

- JWT auth + multi-tenant organizations already working
- Stripe one-time and subscription payments wired up
- Drizzle ORM + Neon DB with migrations ready
- Claude Code `.claude/` configuration that enforces your conventions automatically
- 22 skills Claude can invoke to scaffold new features in seconds

You can remove what you don't need -- it's much faster than adding what you do.

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** + **Shadcn UI**
- **Drizzle ORM** + **Neon DB** (serverless Postgres)
- **JWT** authentication + **bcryptjs**
- **Stripe** (one-time + subscription payments)
- **Resend** + **react-email** (transactional email)
- **Cloudinary** (file uploads)
- **Claude / Anthropic SDK** (AI features)
- **next-intl** (i18n)
- **Zod v4** + **React Hook Form**
- **SWR** (client-side data fetching)
- **sonner** (toasts), **Recharts** (charts)

## What's Included

### Feature modules

- [x] **User** -- registration, login, JWT auth, profile
- [x] **Organization** -- multi-tenant org management
- [x] **OrgMember** -- role-based membership (owner / admin / member)
- [x] **Invitation** -- email-based org invitations
- [x] **Post** -- MDX blog stored in DB with AI-assisted publishing
- [x] **Subscription** -- Stripe subscription billing
- [x] **Order** -- one-time payments
- [x] **Credit** -- AI credit system

### Claude Code configuration (`.claude/`)

The `.claude/` folder is what makes this boilerplate different from everything else in 2026. Claude Code loads it automatically and follows your project conventions from the first prompt.

| Item                    | Purpose                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| `CLAUDE.md`             | Project-wide instructions and conventions Claude always follows          |
| `skills/`               | 22 reusable skills Claude can invoke on demand                           |
| `hooks/pre-tool-use.sh` | Blocks dangerous commands (DROP TABLE, rm -rf, force push) automatically |
| `settings.json`         | Auto-approved safe commands + format/lint on every file save             |
| `agents/`               | Specialized sub-agents for focused tasks                                 |

### Skills available

| Skill                 | What it does                                                                            |
| --------------------- | --------------------------------------------------------------------------------------- |
| `feature-module`      | Scaffold all 7 module files: schema, relations, types, validation, repo, service, index |
| `nextjs-api-route`    | Add a thin API route wired to the service layer                                         |
| `drizzle-relations`   | Add Drizzle `relations()` block and register in `db/drizzle.ts`                         |
| `drizzle-migrate`     | Generate and apply a migration after schema changes                                     |
| `swr-hooks`           | Generate `useSWR` read hooks and `useSWRMutation` write hooks for a module              |
| `claude-feature`      | Add a streaming AI chat endpoint + `useAiChat` hook                                     |
| `stripe-setup`        | Wire up Stripe checkout, webhooks, and subscription sync                                |
| `email-setup`         | Add Resend + react-email transactional email for a flow                                 |
| `cloudinary-upload`   | Add file upload route + client hook via Cloudinary                                      |
| `vercel-deploy`       | Guided Vercel deploy walkthrough with env vars                                          |
| `multi-tenancy`       | Add org, orgMember, and invitation modules with role-based access                       |
| `nextjs-mdx-blog`     | Add MDX blog (file-based or DB-based) with Tailwind typography                          |
| `auth-patterns`       | JWT auth patterns: registration, login, protected routes                                |
| `api-patterns`        | API route conventions: validation, error handling, response shape                       |
| `db-patterns`         | Drizzle ORM patterns: queries, relations, migrations                                    |
| `ui-patterns`         | Component conventions: server vs client, shadcn usage, theming                          |
| `component-splitting` | Extract oversized components into co-located subfolders                                 |
| `dto-patterns`        | DTO conventions: Omit, never return passwordHash, layer boundaries                      |
| `landing-page`        | Scaffold a marketing landing page with sections and CTAs                                |
| `pwa`                 | Add PWA manifest and service worker                                                     |
| `i18n`                | Add next-intl with locale routing and translation files                                 |
| `init-project`        | First-run setup: env vars, DB, and Vercel link                                          |

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd claude-code-boilerplates
npm install
```

### 2. Set up environment variables

Copy the example and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:

```env
# Database
DATABASE_URL=           # Neon DB connection string

# Auth
JWT_SECRET=             # Any long random string

# AI
ANTHROPIC_API_KEY=      # From console.anthropic.com
AI_API_KEY=             # Internal key for /api/posts and similar protected endpoints
AI_CREDITS_PER_MESSAGE= # Credits deducted per AI call (default: 10)

# Email (Resend)
RESEND_API_KEY=

# File uploads (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Payments (Stripe)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME=price_REPLACE_ME
NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION=price_REPLACE_ME

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Set up the database

```bash
npm run db:migrate
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Open in Claude Code

```bash
claude
```

Claude loads `CLAUDE.md` automatically and knows your full project conventions from the start -- folder structure, naming rules, architecture patterns, and which anti-patterns to avoid.

## Using Claude Code Skills

Skills are invoked with `/skill-name` inside Claude Code. Claude reads the skill file and follows its instructions.

### Common skills

**Add a new feature module:**

```
/feature-module categories
```

Scaffolds all 7 module files: schema, relations, types, validation, repo, service, index.

**Add an API route:**

```
/nextjs-api-route POST /api/posts/:id/publish
```

**Set up Stripe:**

```
/stripe-setup
```

## Typical dev session

This is what using the boilerplate looks like day-to-day:

```
# 1. Start the dev server
npm run dev

# 2. Open Claude Code in the same directory
claude
```

Inside Claude Code, Claude already knows your stack. A typical session to add a new `task` feature:

```
/feature-module task
```

Claude scaffolds 7 files in `modules/task/` -- schema, relations, types, validation, repo, service, index -- and registers the table in `db/drizzle.ts`.

```
/nextjs-api-route GET /api/tasks
/nextjs-api-route POST /api/tasks
```

Claude adds thin route handlers following the validate → service → respond pattern. Then:

```bash
npm run db:generate && npm run db:migrate
```

Back in Claude Code:

```
/swr-hooks task
```

Claude generates `hooks/api/useTask.ts` with `useTasks()`, `useCreateTask()`, `useUpdateTask()`, `useDeleteTask()` -- all calling `mutate()` on success.

Then you describe the UI in plain English and Claude builds it using your existing shadcn components, CSS variables, and layout conventions -- without you repeating a single rule.

## MCP Servers

Configured in `.mcp.json`. Add the relevant tokens to `.env`:

| Server     | Token variable                                                         |
| ---------- | ---------------------------------------------------------------------- |
| Neon       | `NEON_API_KEY`                                                         |
| Vercel     | `VERCEL_TOKEN`                                                         |
| Cloudinary | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| Resend     | `RESEND_API_KEY`                                                       |

## Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check

npm run db:generate  # Generate migration from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:push      # Sync schema directly (dev only)
npm run db:studio    # Open Drizzle Studio
```

## Deploy

Push to `main` -- automatic production deploy on Vercel.
Push to any other branch -- preview deployment.

Initial setup:

```bash
vercel link
vercel env add DATABASE_URL
# ... add remaining env vars
```

See the `/vercel-deploy` skill for a guided walkthrough.

## Project Conventions

All conventions are documented in `CLAUDE.md` and followed automatically by Claude Code:

- Server components by default; `"use client"` only when needed
- API routes are thin: validate -> service -> respond
- Business logic lives in service layer only
- Zod for all validation; always `safeParse`, never `parse`
- `HttpError` thrown from services, caught in routes via `handleError()`
- Never return `passwordHash`; always strip with `Omit<>`
- CSS variables for colors; never hardcoded hex values

## FAQ

**Does this work with the Next.js App Router?**
Yes -- the entire project uses App Router. There are no Pages Router files.

**Can I use this without Stripe?**
Yes. The `subscription` and `order` modules are self-contained. Remove the routes and modules you don't need, or just ignore them -- they don't affect the rest of the app.

**Can I use this without multi-tenancy?**
Yes. The `organization`, `orgMember`, and `invitation` modules are independent. Skip them if you're building a single-tenant app.

**What database does it use?**
Neon DB (serverless Postgres) via Drizzle ORM. You can point `DATABASE_URL` at any Postgres instance -- local, Supabase, Railway, etc.

**Do I need Claude Code to use this boilerplate?**
No -- it's a standard Next.js project. Claude Code is optional, but the `.claude/` configuration is what makes the AI-assisted workflow powerful.

**How is this different from other Next.js SaaS starters?**
Most starters give you the feature modules. This one also gives you a complete Claude Code setup -- CLAUDE.md conventions, skills, safety hooks, and sub-agents -- so your AI assistant understands the project from day one and never drifts from your architecture.

**Is this production-ready?**
The patterns are production-grade (DDD-lite modules, proper error handling, Zod validation, no business logic in routes). The starter itself is a template -- you still need to audit security, add monitoring, and configure your own secrets before shipping.

**What is a skill?**
A skill is a markdown file in `.claude/skills/` that Claude Code reads and executes as a multi-step instruction set. Running `/feature-module task` tells Claude to read the `feature-module` skill file and follow its steps -- scaffolding 7 module files, updating `db/drizzle.ts`, and following your naming conventions automatically.

**What version of Claude Code do I need?**
Any version that supports the `.claude/` folder convention (available since Claude Code 1.x). Skills, hooks, and `CLAUDE.md` all use standard Claude Code features with no special plugins required.

**Can I use this with Cursor, GitHub Copilot, or other AI tools?**
Yes for the code -- it's a standard Next.js project. The `.claude/` folder is Claude Code-specific. You can adapt `CLAUDE.md` as a rules file for Cursor, but the skills and hooks only run inside Claude Code.

## License

MIT
