# Claude Code Boilerplate

A production-ready Next.js + Neon DB starter with built-in Claude Code configuration — skills, hooks, agents, and CLAUDE.md patterns ready to use out of the box.

## What is this?

This boilerplate gives you a full-stack Next.js application pre-wired for AI-assisted development with Claude Code. Instead of spending time setting up tooling, conventions, and AI workflows, you get all of that on day one — and you can start shipping features immediately.

It demonstrates real patterns used in production SaaS apps: authentication, multi-tenant organizations, Stripe payments, blog with MDX, transactional email, file uploads, AI chat — all following a consistent DDD-lite module architecture.

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

| Module         | Description                                |
| -------------- | ------------------------------------------ |
| `user`         | Registration, login, JWT auth, profile     |
| `organization` | Multi-tenant org management                |
| `orgMember`    | Role-based membership (owner/admin/member) |
| `invitation`   | Email-based org invitations                |
| `post`         | MDX blog stored in DB                      |
| `subscription` | Stripe subscription billing                |
| `order`        | One-time payments                          |
| `credit`       | AI credit system                           |

### Claude Code configuration (`.claude/`)

| Item                    | Purpose                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| `CLAUDE.md`             | Project-wide instructions and conventions Claude always follows          |
| `skills/`               | 22 reusable skills Claude can invoke on demand                           |
| `hooks/pre-tool-use.sh` | Blocks dangerous commands (DROP TABLE, rm -rf, force push) automatically |
| `settings.json`         | Auto-approved safe commands + format/lint on every file save             |
| `agents/`               | Specialized sub-agents for focused tasks                                 |

### Skills available

`feature-module`, `nextjs-api-route`, `drizzle-relations`, `drizzle-migrate`, `swr-hooks`, `claude-feature`, `stripe-setup`, `email-setup`, `cloudinary-upload`, `vercel-deploy`, `multi-tenancy`, `nextjs-mdx-blog`, `auth-patterns`, `api-patterns`, `db-patterns`, `ui-patterns`, `component-splitting`, `dto-patterns`, `landing-page`, `pwa`, `i18n`, `init-project`

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

Claude will load `CLAUDE.md` automatically and know the full project conventions from the start.

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

**Generate a blog post and save it to the DB:**

```
/generate-post <title> — <brief>
```

## The `/generate-post` Skill

This skill lets Claude write and publish a full MDX blog post directly to your database in one command.

### How it works

1. Reads the **Blog Style Guide** from `CLAUDE.md` to match your tone and keywords
2. Fetches existing posts from `GET /api/posts` to avoid duplicate content
3. Generates a full MDX post with headings, code blocks, and prose
4. POSTs to `POST /api/posts` using your `AI_API_KEY`
5. Reports back the created slug and title

### Usage

```
/generate-post Server Actions vs API Routes — when to use each in Next.js App Router
```

```
/generate-post Role Hierarchies in Multi-Tenant SaaS — owner, admin, member explained
```

Posts are saved with `published: false` by default — review them in Drizzle Studio before publishing.

### Customizing the style guide

Edit the `# Blog Style Guide` section in `CLAUDE.md` to define your blog's voice, target audience, must-include keywords, and topics to avoid. The skill reads this section every time it runs.

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

Push to `main` → automatic production deploy on Vercel.
Push to any other branch → preview deployment.

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
- API routes are thin: validate → service → respond
- Business logic lives in service layer only
- Zod for all validation; always `safeParse`, never `parse`
- `HttpError` thrown from services, caught in routes via `handleError()`
- Never return `passwordHash`; always strip with `Omit<>`
- CSS variables for colors; never hardcoded hex values
