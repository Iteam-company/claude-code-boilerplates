---
name: dto-patterns
description: Type and validation conventions for this Next.js project. Types live in modules/[name]/[name].types.ts, Zod schemas in modules/[name]/[name].validation.ts. Load when creating or modifying types, validation schemas, or shared interfaces.
---

# Type & Validation Patterns

This is a plain Next.js app — no NestJS, no monorepo, no class-based DTOs.

## Split per module

Each module owns its types and validation:

```
modules/[name]/
├── [name].types.ts       ← plain TypeScript interfaces/types
└── [name].validation.ts  ← Zod schemas for API boundary validation
```

## Types (`[name].types.ts`)

```ts
export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePostInput = {
  title: string;
  content: string;
  authorId: string; // set from JWT in route, not client input
};

export type UpdatePostInput = Partial<Omit<CreatePostInput, 'authorId'>>;

// With relations — used when repo queries include `with`
export type PostWithAuthor = Post & {
  author: { id: string; name: string };
};
```

Rules:

- Use `type` for unions/primitives, `interface` for object shapes
- Never infer types directly from Drizzle schema in components
- Use `Omit<>` to strip server-set fields (e.g. `passwordHash`, `authorId`)
- Add `WithRelation` variants when repo queries use `with`

## Validation (`[name].validation.ts`)

```ts
import { z } from 'zod';

// Only fields the CLIENT sends — never authorId, id, or timestamps
export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;

export const updatePostSchema = createPostSchema.partial();

export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>;
```

Rules:

- Schema = what the client sends; server-set fields (`authorId`, `id`, timestamps) excluded
- `authorId` is extracted from JWT in the route via `getUserFromRequest(req)`
- Always use `.partial()` for update schemas
- Prefer `safeParse` over `parse` — never let Zod throw in routes

## Barrel export

Both types and validation are exported via the module's `index.ts`:

```ts
export * from './post.types';
export * from './post.validation';
```

Import at route/service level via the barrel:

```ts
import { createPostSchema, type CreatePostInput } from '@/modules/post';
```
