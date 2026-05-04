# Project

Brief description of what this project is.

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
├── layout.tsx ← root layout (html, body, providers)
├── globals.css
components/
├── ui/ ← shadcn components, never modify these directly
├── layout/ ← header, footer, sidebar
│ ├── header.tsx
│ ├── footer.tsx
│ └── sidebar.tsx
lib/
├── utils.ts ← cn() and shared utilities
├── validations/ ← zod schemas
hooks/ ← custom react hooks
types/ ← shared typescript types
public/

# Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — run eslint
- `pnpm tsc --noEmit` — type check without building
- `npx shadcn@latest add <component>` — add shadcn component

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

## API Layer (Next.js)

- All API routes are located in app/api/\*
- Use App Router (route.ts)
- Routes must be thin:
  - validate input
  - call service
  - return response
- Never place business logic inside routes

## Modules (DDD-lite)

All business logic lives in src/modules/

```
src
|-- db
|   |-- drizzle.ts
|   `-- schema.ts
|-- lib
|   `-- errors
|       |-- handle-error.ts
|       |-- http-error.ts
|       `-- index.ts
`-- modules
    `-- user
        |-- index.ts
        |-- user.repo.ts
        |-- user.schema.ts
        |-- user.service.ts
        |-- user.types.ts
        `-- user.validation.ts
```

## Database (Drizzle)

- Use Drizzle ORM for all DB access
- Schemas are defined in \*.schema.ts
- Table naming convention:
  - plural (users, posts)
- Export naming:
  - export const users = pgTable(...)
  - never use UserSchema

## Repository Layer

- Only DB queries
- No business logic
- Always typed via user.types.ts

Examples:
userRepo.findByEmail(email)
userRepo.create(data)

## Service Layer

- Contains all business logic
- Can throw domain/HTTP errors
- Must NOT know about HTTP (Request/Response)

Examples:
userService.register()
userService.login()

## API Routes

Pattern:

```ts
export async function POST(req: Request) {
  try {
    // validate
    // call service
    // return response
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

## Validation (Zod)

- All validation schemas live in modules/_/_.validation.ts
- Never validate manually in routes
- Always use safeParse

Example:
const parsed = schema.safeParse(body);

## Types

Used for:

- service return types
- repo input types
- API contracts

Example:
user.types.ts

```ts
AuthResponse = {
user: Omit<User, "passwordHash">;
token: string;
}
```

## Rules

- Never duplicate types between layers
- Never infer DB types directly in UI
- Use Omit<> for safe objects

## Auth

### Current approach

- JWT (Bearer token)
- Returned in response body

Authorization: Bearer <token>

### Rules

- Never return passwordHash
- Always sanitize user object

Example:
const { passwordHash, ...safeUser } = user;

## Error Handling

### HttpError

throw new HttpError(401, "Invalid credentials");

### Global handler

catch (error: unknown) {
return handleError(error);
}

### Rules

- Never use any in catch
- Always use unknown
- Always centralize error handling

## Database Migrations

### Important

- Drizzle schema DOES NOT create tables automatically

### Commands

npx drizzle-kit generate
npx drizzle-kit push

### Rules

- Always run migrations after schema changes
- Never assume table exists

## Security

- Always hash passwords (bcrypt)
- Never store raw passwords
- Use environment variables for secrets

JWT_SECRET=...
DATABASE_URL=...

### DB

- tables → plural (users)
- columns → snake_case (created_at)

### TS

- variables → camelCase
- types → PascalCase

## Anti-Patterns (DO NOT DO)

- business logic in routes
- DB queries in components
- using any
- returning passwordHash
- manual validation instead of Zod
- mixing schema/validation/types
- naming Drizzle tables as UserSchema
