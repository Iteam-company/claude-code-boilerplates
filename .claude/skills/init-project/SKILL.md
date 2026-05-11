---
name: init-project
description: Initialize a new CLAUDE.md with domain context for a new project. Triggers when CLAUDE.md does not exist or is empty. Asks the user five questions — name, description, business model, modules, constraints — then writes a fully structured CLAUDE.md. Use this skill whenever the user types /init-project or asks to initialize, scaffold, or create a CLAUDE.md from scratch.
---

# init-project Skill

Use this skill when the user runs `/init-project` or when `CLAUDE.md` does not exist in the project root and the user wants to set up a new project.

---

## Step 1 — Check for existing CLAUDE.md

Before doing anything, check if `CLAUDE.md` already exists and has content:

```bash
test -s CLAUDE.md && echo "exists" || echo "missing"
```

- If it **exists and has content** → ask the user if they want to overwrite it. If no, stop.
- If it **does not exist or is empty** → proceed to Step 2.

---

## Step 2 — Ask five questions

Ask the user these five questions all at once in a numbered list. Wait for them to answer all five before proceeding.

```
To set up CLAUDE.md, answer 5 questions:

1. **Name** — what is the project called?
2. **Description** — what does it do? (1–3 sentences)
3. **Business model** — how does it make money? (SaaS, one-time, marketplace, B2B, B2C, freemium, etc.)
4. **Modules** — what are the main entities / features? (e.g. users, posts, orders, payments, notifications)
5. **Constraints** — what should NOT be done, or what is important to avoid? (technical, product, team)
```

---

## Step 3 — Generate CLAUDE.md

Using the answers, write a `CLAUDE.md` file in the project root. Use the full template below, filling in the placeholders from the user's answers. Do not remove any section — every section is standard boilerplate that applies to all projects in this stack.

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

- Next.js (App Router, no src folder)
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

# Structure

```
app/
├── (main)/
│   ├── layout.tsx        ← main layout with header & footer
│   └── page.tsx
├── api/                  ← thin API route handlers (validate → service → respond)
├── layout.tsx            ← root layout (html, body, providers)
├── globals.css
components/
├── ui/                   ← shadcn components, never modify these directly
├── layout/               ← header, footer, sidebar
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
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

- Define metadata in each `page.tsx` using Next.js `Metadata` type
- Always export metadata from every page

```ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

## Dynamic metadata

- Use `generateMetadata` for dynamic pages (e.g. blog posts, products)

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} | Site Name`,
    description: '...',
  };
}
```

## Root layout metadata

- Set base metadata in `app/layout.tsx` with `metadataBase`

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: 'Site Name',
    template: '%s | Site Name',
  },
  description: 'Default description',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};
```

## Conventions

- Always set `metadataBase` in root layout — required for absolute OG image URLs
- Use `title.template` so page titles are consistent
- Every page must have a unique `title` and `description`
- Never hardcode the base URL — use `NEXT_PUBLIC_BASE_URL` env variable

# Backend Architecture

## API Layer (Next.js)

- All API routes are located in `app/api/*`
- Use App Router (`route.ts`)
- Routes must be thin: validate → call service → return response
- Never place business logic inside routes
- See skill: `nextjs-api-route`

## Modules (DDD-lite)

All business logic lives in `modules/`. Every module has 7 files:
`schema` → `relations` → `types` → `validation` → `repo` → `service` → `index`

- See skill: `drizzle-module`

## Database (Drizzle)

- Use Drizzle ORM for all DB access
- Table naming: plural (`users`, `posts`, `comments`, `likes`)
- Export naming: `camelCase` + `Table` suffix (`userTable`, `postTable`)
- Never name exports `UserSchema`
- Always define `*.relations.ts` alongside every `*.schema.ts`
- Always register schemas and relations in `db/drizzle.ts`
- See skill: `drizzle-relations`

## Repository Layer

- Only DB queries — no business logic
- Always typed via `*.types.ts`

## Service Layer

- All business logic lives here
- Throws `HttpError` — never returns error objects
- Ownership checks belong here, not in routes
- Must NOT import `Request` or `Response`

## Validation (Zod)

- All schemas in `modules/*/*.validation.ts`
- Always use `safeParse` — never `parse`
- Schema fields = what the client sends (never `authorId`, `id`, timestamps)
- `authorId` comes from JWT via `getUserFromRequest` in the route

## Types

- Never infer DB types directly in UI
- Never duplicate types between layers
- Use `Omit<>` for safe objects (e.g. strip `passwordHash`)

## Auth

- JWT — Bearer token, returned in response body on login/register
- Extracted via `getUserFromRequest(req)` from `lib/auth.ts`
- Throws `HttpError(401)` if token missing or invalid
- Never return `passwordHash`
- Always sanitize user object: `const { passwordHash: _, ...safeUser } = user`

## Error Handling

- Throw `HttpError(status, message)` from services
- Always `catch (error: unknown)` — never `any`
- Always delegate to `handleError(error)` in routes

## Hooks (SWR)

- All hooks in `hooks/api/*.ts`
- `useSWR` for reads, `useSWRMutation` for writes
- Use `fetcher`, `poster`, `putter`, `deleter` from `lib/fetcher.ts`
- File uploads use manual `fetch` with `FormData` — not `poster`
- Call `mutate()` in `onSuccess` to keep cache in sync
- Never use hooks in Server Components
- See skill: `swr-hooks`

## Naming Conventions

### DB

- Tables → plural (`users`, `posts`)
- Columns → `snake_case` (`created_at`, `author_id`)

### TypeScript

- Variables → `camelCase`
- Types → `PascalCase`
- Table exports → `camelCase` + `Table` suffix (`userTable`)

## Environment Variables

```
JWT_SECRET=
DATABASE_URL=
NEXT_PUBLIC_BASE_URL=
```

## Deployment (Vercel)

- Hosted on Vercel, connected to GitHub via `vercel git connect`
- Push to `main` → production deployment (automatic)
- Push to any other branch → preview deployment (automatic)
- No manual deploy commands needed after initial setup
- Environment variables managed via `vercel env add` — never commit secrets
- See skill: `vercel-deploy`

## Anti-Patterns (DO NOT DO)

- Business logic in routes
- DB queries in components
- DB access inside UI components
- Using `any`
- Returning `passwordHash`
- Manual validation instead of Zod
- Mixing schema / validation / types
- Naming Drizzle tables as `UserSchema`
- Using `db.query.*` with `with` without `*.relations.ts`
- Fetching in Client Components when a Server Component would do
- Setting `Content-Type` manually when using `FormData`
- Massive files/modules
- Hidden side effects
- Tight coupling between modules
````

---

## Step 4 — Confirm

After writing the file, tell the user:

```
CLAUDE.md created. Review the Domain Modules and Constraints sections — the rest is standard boilerplate that applies to all projects.
```

---

## Notes

- Fill in `{Name}`, `{Description}`, `{Business model}` using the user's exact wording — don't paraphrase.
- For modules: generate a row per module with a one-sentence purpose inferred from context.
- For constraints: copy faithfully — if the user says "no Redux", write "Do not use Redux".
- If the user mentioned specific tech (e.g. "we use Supabase instead of Neon"), update the Tech Stack section accordingly.
- The Domain Modules and Constraints sections are the only parts that change per project. Everything else is the standard stack boilerplate.
