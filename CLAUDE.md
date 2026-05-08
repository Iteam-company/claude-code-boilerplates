# Project

Next.js + Neon DB boilerplate with built-in Claude Code configuration — skills, hooks, agents, and CLAUDE.md patterns ready to use out of the box.

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
- Recharts (charts)
- Drizzle ORM (PostgreSQL)
- Neon DB (serverless Postgres)
- JWT (authentication)
- bcryptjs (password hashing)

# Structure

app/
├── (main)/
│ ├── layout.tsx ← main layout with header & footer
│ └── page.tsx
├── api/ ← thin API route handlers (validate → service → respond)
├── layout.tsx ← root layout (html, body, providers)
├── globals.css
components/
├── ui/ ← shadcn components, never modify these directly
├── layout/ ← header, footer, sidebar
│ ├── header.tsx
│ ├── footer.tsx
│ └── sidebar.tsx
db/
├── drizzle.ts ← db client + all schema/relations registered here
├── schema.ts ← re-exports all table schemas
modules/ ← feature modules (DDD-lite, one folder per entity)
├── user/
├── post/
├── comment/
└── like/
lib/
├── utils.ts ← cn() and shared utilities
├── auth.ts ← getUserFromRequest(), JWT helpers
├── errors/ ← HttpError class + handleError() for routes
├── fetcher.ts ← client-side fetch utility
├── routes.ts ← centralized route path constants
hooks/ ← custom react hooks
types/ ← shared typescript types
public/

# Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — run eslint
- `pnpm tsc --noEmit` — type check without building
- `npx shadcn@latest add <component>` — add shadcn component

## Database

- `pnpm db:generate` — generate SQL migration from schema changes
- `pnpm db:migrate` — apply pending migrations to the database
- `pnpm db:push` — sync schema directly to DB without a migration file (dev only)
- `pnpm db:studio` — open Drizzle Studio to inspect data

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

## TypeScript

- Never use `any` — use `unknown` and narrow the type
- Always type component props explicitly with an interface
- Use `type` for unions and primitives, `interface` for object shapes

## Forms

- Always use React Hook Form + Zod for forms
- Define zod schema first, infer the type from it
- Example:

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

## Architecture Style

The backend follows a lightweight DDD/module-oriented structure.

Each feature is isolated inside `modules/<feature>`.

Typical module structure:

```txt
modules/
└── feature/
    ├── feature.schema.ts
    ├── feature.relations.ts
    ├── feature.types.ts
    ├── feature.validation.ts
    ├── feature.repo.ts
    ├── feature.service.ts
    └── index.ts
```

## Layer Responsibilities

### API Routes

Located in:

```txt
app/api/*
```

Responsibilities:

- authentication
- request parsing
- validation
- calling services
- returning responses

Rules:

- keep routes thin
- never place business logic in routes
- never place DB queries in routes

### Services

Contain business logic.

Responsibilities:

- orchestration
- authorization/ownership checks
- domain rules
- throwing domain errors

Rules:

- services must not depend on HTTP primitives
- services should not know about `Request`/`Response`

### Repositories

Contain database access only.

Responsibilities:

- queries
- persistence
- data retrieval

Rules:

- no business logic
- no HTTP logic

### Validation

Validation lives in module validation files.

Rules:

- validate all external input
- prefer `safeParse`
- validate at API boundaries

## Database Rules

- Use Drizzle ORM
- Define relations explicitly
- Register schemas and relations in the DB schema object
- Use migrations for schema changes
- Keep schemas normalized

Naming:

- tables → plural snake_case
- columns → snake_case

## TypeScript Rules

- Avoid `any`
- Prefer explicit types at boundaries
- Use inference internally where clear
- Use shared module types for contracts

Naming:

- variables/functions → camelCase
- types/classes → PascalCase

## Error Handling

- Centralize error handling
- Use typed/domain errors
- Never throw raw strings
- Avoid silent failures

## Security

- Never expose secrets
- Never store raw passwords
- Use environment variables
- Sanitize sensitive fields before returning responses

## Preferred Patterns

- Thin API routes
- Composition over inheritance
- Feature/module isolation
- Small focused functions
- Shared utilities
- Server-side data fetching when possible

## Anti-Patterns

- Business logic in routes
- DB access inside UI components
- Massive files/modules
- Hidden side effects
- Tight coupling between modules
- Manual validation in routes/components

# MCP

MCP servers are configured in `.mcp.json`. Required tokens — add to `.env` if missing:

| Server     | Variable                | Where to get it                        |
| ---------- | ----------------------- | -------------------------------------- |
| neon       | `NEON_API_KEY`          | console.neon.tech → Account → API Keys |
| vercel     | `VERCEL_TOKEN`          | vercel.com → Settings → Tokens         |
| cloudinary | `CLOUDINARY_CLOUD_NAME` | cloudinary.com → Settings → API Keys   |
| cloudinary | `CLOUDINARY_API_KEY`    | cloudinary.com → Settings → API Keys   |
| cloudinary | `CLOUDINARY_API_SECRET` | cloudinary.com → Settings → API Keys   |

## Cloudinary

- Use the `cloudinary` MCP tools to upload, transform, and manage media assets
- Always upload user files via the Cloudinary MCP — never store images locally or in the DB
- Use Cloudinary's transformation URL parameters for resizing/formatting (e.g. `w_800,f_auto,q_auto`)
- Store only the Cloudinary `public_id` in the database, not full URLs — construct URLs at render time
- Never expose `CLOUDINARY_API_SECRET` to the client — all uploads must go through a server action or API route

If an MCP tool fails due to a missing token, stop and ask the user to add the relevant variable to `.env`, then restart the dev session before retrying.
