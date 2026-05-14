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

## API Layer (Next.js)

- All API routes are located in `app/api/*`
- Use App Router (`route.ts`)
- Routes must be thin: validate → call service → return response
- Never place business logic inside routes
- See skill: `nextjs-api-route`

## Modules (DDD-lite)

All business logic lives in `src/modules/`. Every module has 7 files:
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

## File Uploads

- All uploads via `lib/cloudinary.ts` → `POST /api/upload`
- Protected — requires Bearer token
- Returns `{ url: string }`
- See skill: `cloudinary-upload`

## Email (Resend + react-email)

- Transactional email via **Resend** (`lib/email.ts`) + **react-email** templates (`emails/`)
- `emailService.sendEmail({ to, subject, react })` — single send function used across all flows
- Templates: `WelcomeEmail`, `VerifyEmail`, `ResetPasswordEmail` — each accepts `appName` + a URL prop
- Feature flags in `lib/email.ts`: `ENABLE_WELCOME_EMAIL`, `ENABLE_EMAIL_VERIFICATION` (both default `false`)
- Dev sender: `onboarding@resend.dev` (Resend sandbox); production requires a verified domain
- Always call `emailService` from services, never from routes
- Always use `React.createElement(Template, props)` in service files — no JSX allowed there
- See skill: `email-setup`

## Blog (MDX)

Two supported approaches — **ask the user which one they want before scaffolding**:

### Option A — File-based (`@next/mdx`)

- MDX files live in `content/blog/*.mdx`, discovered at build time via `lib/blog.ts`
- Frontmatter is a **JS export** (`export const frontmatter = {...}`), never YAML `---` blocks
- `mdx-components.tsx` at the repo root provides styled element overrides
- `next.config.ts` wraps config with `createMDX({ options: { remarkPlugins: [['remark-gfm', {}]] } })`
- **Dev script must use `--no-turbopack`** — Turbopack cannot serialize remark plugin functions
- Slug pages use `await import('@/content/blog/${slug}.mdx')` to get both the component and frontmatter
- Use `generateStaticParams` so webpack bundles all slug routes at build time
- See skill: `nextjs-mdx-blog`

### Option B — DB-based (`next-mdx-remote`)

- MDX stored as a raw string in the `content` DB column
- Public blog pages are Server Components — call `postService` directly
- Client rendering uses `next-mdx-remote` (non-rsc variant) + `serialize()` inside `useEffect`
- See skill: `nextjs-mdx-blog`

### Styling (both approaches)

- Add `@plugin "@tailwindcss/typography"` to `app/globals.css` (Tailwind v4 syntax)
- Wrap rendered content in `<article className="prose prose-neutral dark:prose-invert max-w-none">`
- Custom element overrides (headings, code, tables, blockquotes) use CSS variables — `text-foreground`, `bg-muted`, `border-border`, `text-muted-foreground` — never hardcoded hex values

## AI Features (Claude / Anthropic)

- SDK client lives in `lib/claude.ts` — never instantiate `Anthropic` inline
- Streaming chat: `POST /api/ai/chat` → Server-Sent Events consumed by `useAiChat` hook
- Tool use / agentic loop: `POST /api/ai/agent` — loop until `stop_reason !== 'tool_use'`
- Always deduct credits **before** calling Claude — fail fast on `402 Insufficient credits`
- Use `cachedSystem()` from `lib/claude.ts` for system prompts > 1 000 tokens (cuts cost up to 90 %)
- `AI_CREDITS_PER_MESSAGE` env var controls cost per call without a redeploy
- See skill: `claude-feature`

## Hooks (SWR)

- All hooks in `hooks/api/*.ts`
- `useSWR` for reads, `useSWRMutation` for writes
- Use `fetcher`, `poster`, `putter`, `deleter` from `lib/fetcher.ts`
- File uploads use manual `fetch` with `FormData` — not `poster`
- Call `mutate()` in `onSuccess` to keep cache in sync
- Never use hooks in Server Components
- See skill: `swr-hooks`

## Database Migrations

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

Always run after schema changes. Never assume a table exists.

## Deployment (Vercel)

- Hosted on Vercel, connected to GitHub via `vercel git connect`
- Push to `main` → production deployment (automatic)
- Push to any other branch → preview deployment (automatic)
- No manual deploy commands needed after initial setup
- Environment variables managed via `vercel env add` — never commit secrets
- See skill: `vercel-deploy`

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

## Multi-Tenancy (Organizations)

Three modules: `organization`, `orgMember`, `invitation`. Role hierarchy: `owner > admin > member`.

- Slug is auto-generated from org name — client only sends `name`
- `orgRoleEnum` defined once in `orgMember.schema.ts`, imported by `invitation.schema.ts`
- Org context stored as `current_org_id` in localStorage, sent as `X-Org-Id` header via `authFetcher`
- Use React Context (`OrgProvider`) for org state — plain `useState` per component won't propagate across layout
- On sign-out: call `clearOrg()` alongside `clearToken()` to reset context state
- Public invite routes (`/api/invitations/[token]/*`) have no auth — token possession proves ownership
- Install `@react-email/render` — required by Resend to render React email templates at runtime
- See skill: `multi-tenancy`

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
