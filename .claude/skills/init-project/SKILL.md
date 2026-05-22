---
name: init-project
description: Full project initialization after cloning the boilerplate. Installs dependencies, walks through .env setup, configures the database, and writes a project-specific CLAUDE.md. Run this once after cloning. Triggers on /init-project.
---

# init-project Skill

Run this once after cloning the boilerplate to your local machine. It installs dependencies, sets up environment variables interactively, migrates the database, and writes a project-specific `CLAUDE.md`.

---

## Step 1 — Welcome

Tell the user:

```
Welcome! Let's get your project set up. This will take about 5 minutes.

I'll:
  1. Install dependencies
  2. Ask a few questions about your project
  3. Walk you through setting up .env
  4. Run database migrations
  5. Write your CLAUDE.md

Let's go.
```

---

## Step 2 — Install dependencies

Run:

```bash
npm install
```

Tell the user you're installing dependencies and show the output. If it fails, stop and report the error.

---

## Step 3 — Ask project questions

Ask these 5 questions all at once. Wait for all answers before continuing.

```
To customise CLAUDE.md for your project, answer 5 questions:

1. Name — what is your project called?
2. Description — what does it do? (1–3 sentences)
3. Business model — how does it make money? (SaaS, one-time purchase, marketplace, B2B, freemium, etc.)
4. Modules — what are the main entities or features you're building? (e.g. users, posts, orders, notifications, subscriptions)
5. Constraints — anything that must NOT be done, or important to keep in mind? (technical, product, team rules)
```

---

## Step 4 — Set up .env

### 4a — Copy template

Check if `.env` already exists. If not, copy the example:

```bash
test -f .env || cp .env.example .env
```

### 4b — Generate JWT_SECRET

Generate a secure random secret and write it to `.env`:

```bash
node -e "const c=require('crypto');const s=c.randomBytes(48).toString('base64');const fs=require('fs');let e=fs.readFileSync('.env','utf8');e=e.replace(/^JWT_SECRET=.*$/m,'JWT_SECRET='+s);fs.writeFileSync('.env',e);console.log('JWT_SECRET set');"
```

### 4c — Set NEXT_PUBLIC_BASE_URL

Write the default local URL to `.env`:

```bash
node -e "const fs=require('fs');let e=fs.readFileSync('.env','utf8');e=e.replace(/^NEXT_PUBLIC_BASE_URL=.*$/m,'NEXT_PUBLIC_BASE_URL=http://localhost:3000');fs.writeFileSync('.env',e);console.log('NEXT_PUBLIC_BASE_URL set to http://localhost:3000');"
```

### 4d — Database (required)

Tell the user:

```
DATABASE_URL is required. You need a Postgres connection string.

Recommended: Neon DB (free tier, no credit card)
  1. Go to neon.tech and create a free project
  2. Copy the connection string from the dashboard (looks like: postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require)

Paste your DATABASE_URL here:
```

Wait for the user to paste the value, then write it to `.env`:

```bash
node -e "const fs=require('fs');let e=fs.readFileSync('.env','utf8');e=e.replace(/^DATABASE_URL=.*$/m,'DATABASE_URL=PASTE_VALUE');fs.writeFileSync('.env',e);console.log('DATABASE_URL set');"
```

Replace `PASTE_VALUE` with the value the user gave you.

### 4e — Ask which optional services to configure

Ask:

```
Which services do you want to configure now? (you can add others later by editing .env)

  A — Stripe (payments)
  B — Resend (email)
  C — Cloudinary (file uploads)
  D — Anthropic (AI features)
  E — Skip all, I'll fill .env manually

Type the letters for what you want (e.g. "A B D") or "E" to skip:
```

Wait for the answer, then configure only the services the user selected.

---

**If Stripe selected:**

Tell the user:

```
Stripe setup:
  1. Go to dashboard.stripe.com → Developers → API keys
  2. Copy the Secret key (starts with sk_test_ or sk_live_)
  3. Copy the Publishable key (starts with pk_test_ or pk_live_)
  4. For the webhook secret: run `stripe listen` locally to get whsec_...
  5. For price IDs: go to Products → create a product → copy the price ID

Paste your Stripe Secret key:
```

Collect each value one at a time and write to `.env`. Repeat for each Stripe variable (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME, NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION).

---

**If Resend selected:**

Tell the user:

```
Resend setup:
  1. Go to resend.com → API Keys → Create API Key
  2. Copy the key (starts with re_)

Paste your RESEND_API_KEY:
```

Write to `.env`.

---

**If Cloudinary selected:**

Tell the user:

```
Cloudinary setup:
  1. Go to cloudinary.com → Settings → API Keys
  2. You need: Cloud Name, API Key, API Secret

Paste your CLOUDINARY_CLOUD_NAME:
```

Collect CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET one at a time and write each to `.env`.

---

**If Anthropic selected:**

Tell the user:

```
Anthropic setup:
  1. Go to console.anthropic.com → API Keys → Create Key
  2. Copy the key (starts with sk-ant-)

Paste your ANTHROPIC_API_KEY:
```

Write to `.env`. Then ask:

```
How many AI credits should be deducted per message? (default: 10)
Press enter to use 10, or type a number:
```

Write `AI_CREDITS_PER_MESSAGE` to `.env` (default `10`).

---

## Step 5 — Run database migrations

Run:

```bash
npm run db:migrate
```

If this fails with a connection error, tell the user:

```
Migration failed — DATABASE_URL may be incorrect or the database is unreachable.
Check .env and make sure DATABASE_URL is set correctly, then run: npm run db:migrate
```

If it succeeds, confirm: `Database tables created.`

---

## Step 6 — Write CLAUDE.md

Using the answers from Step 3, write a `CLAUDE.md` file in the project root. Check first:

```bash
test -s CLAUDE.md && echo "exists" || echo "missing"
```

If it already has content, ask: `CLAUDE.md already exists. Overwrite it with your project details? (yes/no)`

Use the full template below, filling in the placeholders from Step 3. Do not remove any section.

````markdown
# Project

**{Name}** — {Description}

## Business Model

{Business model — describe how the product makes money, who the customers are, and the pricing/access model.}

## Domain Modules

| Module    | Purpose                                      |
| --------- | -------------------------------------------- |
| {module1} | {one-sentence purpose inferred from context} |
| {module2} | ...                                          |

## Constraints

- {constraint 1}
- {constraint 2}

---

# Tech Stack

- Next.js 16 (App Router, no src folder)
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Zod v4 (validation)
- React Hook Form
- next-themes (dark/light mode)
- sonner (toasts)
- Drizzle ORM (PostgreSQL)
- Neon DB (serverless Postgres)
- JWT (authentication)
- bcryptjs (password hashing)
- Anthropic SDK (`@anthropic-ai/sdk`)

# Structure

```
app/
├── (layout)/
│   ├── layout.tsx        ← main layout with header & footer
│   └── page.tsx
├── (no-layout)/          ← pages without shared layout (auth, etc.)
├── api/                  ← thin API route handlers (validate → service → respond)
├── layout.tsx            ← root layout (html, body, providers)
├── globals.css
components/
├── ui/                   ← shadcn components, never modify these directly
├── header/
├── footer/
db/
├── drizzle.ts            ← db client + all schema/relations registered here
├── schema.ts             ← re-exports all table schemas
modules/                  ← feature modules (DDD-lite, one folder per entity)
lib/
├── utils.ts              ← cn() and shared utilities
├── auth.ts               ← getUserFromRequest(), JWT helpers
├── errors/               ← HttpError class + handleError() for routes
├── fetcher.ts            ← client-side fetch utility
├── routes.ts             ← centralized route path constants
hooks/                    ← custom react hooks
types/                    ← shared typescript types
content/                  ← file-based content (docs, blog)
public/
```

# Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run eslint
- `npx tsc --noEmit` — type check without building
- `npx shadcn@latest add <component>` — add shadcn component

## Database

- `npm run db:generate` — generate SQL migration from schema changes
- `npm run db:migrate` — apply pending migrations to the database
- `npm run db:push` — sync schema directly to DB without a migration file (dev only)
- `npm run db:studio` — open Drizzle Studio to inspect data

# Conventions

## General

- Use named exports for all components
- Use `cn()` from `lib/utils` for merging classnames
- All components in `components/` folder
- Pages only in `app/` folder
- Types in `types/` folder, never inline complex types in components
- Custom hooks in `hooks/` folder, prefix with `use`

## React & Next.js

- Use server components by default
- Add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Never use `"use client"` in layout files unless absolutely necessary
- Fetch data in server components, pass down as props
- Use Next.js `loading.tsx` and `error.tsx` where appropriate
- **Split layouts into components and sections** — page files (`page.tsx`) only compose imported components; never write layout markup or sections inline inside a page file. Extract every distinct section into a named component in `components/`.
- **Split large components** — when a component exceeds ~150 lines or owns mixed concerns, extract it. Co-locate siblings in a subfolder.

## TypeScript

- Never use `any` — use `unknown` and narrow the type
- Always type component props explicitly with an interface
- Use `type` for unions and primitives, `interface` for object shapes

## Forms

- Always use React Hook Form + Zod for forms
- Define zod schema first, infer the type from it

```ts
const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;
```

# Shadcn UI

- Use shadcn components from `components/ui/` — never rebuild what shadcn already provides
- Never modify files inside `components/ui/` directly
- Install new components with `npx shadcn@latest add <component>`
- Use `cn()` from `lib/utils.ts` for merging classnames

## Available components

- button, input, label, textarea
- card, badge, separator
- dialog, sheet, drawer (vaul)
- form (react-hook-form + zod)
- table, pagination
- select, checkbox, radio-group, switch
- toast (sonner)
- calendar (react-day-picker)
- chart (recharts)
- carousel (embla)
- otp (input-otp)

## Theming

- Use CSS variables for colors — never hardcode hex values
- Dark/light mode via `next-themes`
- Customize only in `app/globals.css`
- Never use Tailwind arbitrary color values like `bg-[#fff]`

# Error Handling

- Always handle loading and error states in components
- Use sonner for toast notifications on success/error
- Validate all user input with Zod before submission

# Metadata

## Static metadata

```ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

## Root layout metadata

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: 'Site Name',
    template: '%s | Site Name',
  },
  description: 'Default description',
  openGraph: { type: 'website', locale: 'en_US' },
};
```

## Conventions

- Always set `metadataBase` in root layout
- Use `title.template` so page titles are consistent
- Every page must have a unique `title` and `description`
- Never hardcode the base URL — use `NEXT_PUBLIC_BASE_URL` env variable

# Backend Architecture

## API Layer (Next.js)

- All API routes in `app/api/*`
- Routes must be thin: validate → call service → return response
- Never place business logic inside routes
- See skill: `nextjs-api-route`

## Modules (DDD-lite)

All business logic lives in `modules/`. Every module has 7 files:
`schema` → `relations` → `types` → `validation` → `repo` → `service` → `index`

- See skill: `feature-module`

## Database (Drizzle)

- Table naming: plural (`users`, `posts`)
- Export naming: `camelCase` + `Table` suffix (`userTable`, `postTable`)
- Never name exports `UserSchema`
- Always define `*.relations.ts` alongside every `*.schema.ts`
- Always register schemas and relations in `db/drizzle.ts`
- See skill: `drizzle-relations`

## Service Layer

- All business logic lives here
- Throws `HttpError` — never returns error objects
- Must NOT import `Request` or `Response`

## Validation (Zod)

- All schemas in `modules/*/*.validation.ts`
- Always use `safeParse` — never `parse`
- Schema fields = what the client sends (never `authorId`, `id`, timestamps)

## Auth

- JWT — Bearer token, returned on login/register
- Extracted via `getUserFromRequest(req)` from `lib/auth.ts`
- Throws `HttpError(401)` if token missing or invalid
- Never return `passwordHash`
- Always sanitize: `const { passwordHash: _, ...safeUser } = user`

## Error Handling

- Throw `HttpError(status, message)` from services
- Always `catch (error: unknown)` — never `any`
- Always delegate to `handleError(error)` in routes

## Hooks (SWR)

- All hooks in `hooks/api/*.ts`
- `useSWR` for reads, `useSWRMutation` for writes
- Call `mutate()` in `onSuccess` to keep cache in sync
- See skill: `swr-hooks`

## Environment Variables

```
JWT_SECRET=
DATABASE_URL=
NEXT_PUBLIC_BASE_URL=
RESEND_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME=price_REPLACE_ME
NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION=price_REPLACE_ME
ANTHROPIC_API_KEY=
AI_CREDITS_PER_MESSAGE=10
```

## Deployment (Vercel)

- Push to `main` → production deployment (automatic)
- Push to any other branch → preview deployment (automatic)
- Environment variables managed via `vercel env add` — never commit secrets
- See skill: `vercel-deploy`

## Anti-Patterns (DO NOT DO)

- Business logic in routes
- DB queries in components
- Using `any`
- Returning `passwordHash`
- Manual validation instead of Zod
- Naming Drizzle tables as `UserSchema`
- Using `db.query.*` with `with` without `*.relations.ts`
- Fetching in Client Components when a Server Component would do
- Setting `Content-Type` manually when using `FormData`
- Massive files/modules
- Hidden side effects
- Tight coupling between modules
````

---

## Step 7 — Done

Tell the user:

```
All done! Here's what was set up:

  ✓ npm install complete
  ✓ .env configured
  ✓ Database migrated
  ✓ CLAUDE.md written for {project name}

To start building:

  npm run dev

Then describe what you want to build and I'll use the skills and conventions
from CLAUDE.md to scaffold it for you.

Tip: run /vercel-deploy when you're ready to ship.
```

---

## Notes

- Fill in `{Name}`, `{Description}`, `{Business model}` using the user's exact wording — don't paraphrase.
- For modules: generate one row per module with a one-sentence purpose inferred from context.
- For constraints: copy faithfully — if the user says "no Redux", write "Do not use Redux".
- If the user mentioned specific tech (e.g. "we use Supabase instead of Neon"), update the Tech Stack section.
- The Domain Modules and Constraints sections are the only parts that change per project. Everything else is standard stack boilerplate.
- If any step fails, stop, report the exact error, and wait for the user to fix it before continuing.
- Never skip Step 5 (db:migrate) — without it the app will crash on first request.
