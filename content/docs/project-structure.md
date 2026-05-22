---
title: Project Structure
description: Folder layout, conventions, and architectural decisions.
order: 2
---

# Project Structure

The project follows a DDD-lite architecture. Feature logic lives in modules, pages compose server components, and API routes are intentionally thin.

## Folder layout

```
app/
├── (layout)/          # Pages with header + footer
│   ├── layout.tsx
│   └── page.tsx
├── (no-layout)/       # Pages without shared layout (e.g. auth)
├── api/               # Thin API route handlers
├── layout.tsx         # Root layout (html, body, providers)
└── globals.css

components/
├── ui/                # Shadcn components -- never modify directly
├── header/
├── footer/
└── landing/

db/
├── drizzle.ts         # DB client + all schema/relations registered here
└── schema.ts          # Re-exports all table schemas

modules/               # Feature modules (one folder per entity)
├── user/
├── post/
├── organization/
└── ...

lib/
├── utils.ts           # cn() and shared utilities
├── auth.ts            # getUserFromRequest(), JWT helpers
├── errors/            # HttpError + handleError()
├── fetcher.ts         # Client-side fetch utility
└── routes.ts          # Centralized route path constants

hooks/                 # Custom React hooks (prefix: use*)
types/                 # Shared TypeScript types
content/               # Static file-based content (docs, blog)
```

## Module structure

Every feature module under `modules/` has exactly 7 files:

```
modules/post/
├── post.schema.ts      # Drizzle table definition
├── post.relations.ts   # Drizzle relations
├── post.types.ts       # TypeScript types inferred from schema
├── post.validation.ts  # Zod schemas for API input
├── post.repo.ts        # DB queries only -- no business logic
├── post.service.ts     # Business logic -- throws HttpError
└── index.ts            # Public exports
```

Use the `/feature-module` skill inside Claude Code to scaffold all 7 files automatically.

## Conventions

### React and Next.js

- Server components by default; `"use client"` only when needed (event handlers, hooks, browser APIs)
- Never use `"use client"` in layout files
- Fetch data in server components, pass down as props
- Page files (`page.tsx`) only compose imported components -- no inline markup

### TypeScript

- Never use `any` -- use `unknown` and narrow the type
- Always type component props explicitly with an `interface`
- Use `type` for unions and primitives, `interface` for object shapes

### CSS

- CSS variables for all colors -- never hardcode hex values
- Dark/light mode via `next-themes`
- Customize only in `app/globals.css`
- Never use Tailwind arbitrary values like `bg-[#fff]`

### Database naming

| Layer      | Convention        | Example                   |
| ---------- | ----------------- | ------------------------- |
| Tables     | plural            | `users`, `posts`          |
| Columns    | snake_case        | `created_at`, `author_id` |
| TS exports | camelCase + Table | `userTable`, `postTable`  |
