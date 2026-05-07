---
name: drizzle-module
description: Scaffold a complete Drizzle + Next.js module (schema, relations, types, validation, repo, service, index) following the project's DDD-lite structure. Use this skill whenever the user wants to add a new feature, entity, or resource — e.g. "add a categories module", "I need a tags table", "create a module for X". Always use this skill for new modules — it ensures all 7 files are created consistently and nothing is forgotten.
---

# Drizzle Module Skill

Scaffolds all 7 files for a new module following the project's DDD-lite pattern.

## File structure

```
modules/[name]/
├── [name].schema.ts
├── [name].relations.ts
├── [name].types.ts
├── [name].validation.ts
├── [name].repo.ts
├── [name].service.ts
└── index.ts
```

## Step 1 — Schema (`[name].schema.ts`)

```ts
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { userTable } from '@/modules/user/user.schema'

export const [name]Table = pgTable('[names]', {
  id: uuid('id').defaultRandom().primaryKey(),

  // your fields here

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
```

### Column type reference

| TS type          | Drizzle type                                                                  |
| ---------------- | ----------------------------------------------------------------------------- |
| `string` (short) | `varchar('col', { length: 255 })`                                             |
| `string` (long)  | `text('col')`                                                                 |
| `boolean`        | `boolean('col').default(false).notNull()`                                     |
| `number`         | `integer('col')`                                                              |
| `Date`           | `timestamp('col', { withTimezone: true }).defaultNow().notNull()`             |
| foreign key      | `uuid('x_id').notNull().references(() => xTable.id, { onDelete: 'cascade' })` |
| unique           | `.unique()`                                                                   |
| unique pair      | use `uniqueIndex` in table config                                             |

### Naming conventions

- Table name: plural (`categories`, `tags`, `likes`)
- Export: `camelCase` + `Table` suffix (`categoryTable`)
- Columns: `snake_case` (`created_at`, `author_id`)

## Step 2 — Relations (`[name].relations.ts`)

**Always create this file.** Without it, `db.query.*` with `with` will throw at runtime.

```ts
import { relations } from 'drizzle-orm'
import { [name]Table } from './[name].schema'
import { userTable } from '@/modules/user/user.schema'

export const [name]Relations = relations([name]Table, ({ one, many }) => ({
  // one-to-one / many-to-one:
  author: one(userTable, {
    fields: [[name]Table.authorId],
    references: [userTable.id],
  }),
  // one-to-many:
  // comments: many(commentTable),
}))
```

**After creating relations, always register in `db/drizzle.ts`:**

```ts
import { [name]Table } from '@/modules/[name]/[name].schema'
import { [name]Relations } from '@/modules/[name]/[name].relations'

export const db = drizzle(sql, {
  schema: {
    // ...existing
    [name]Table,
    [name]Relations,
  },
})
```

## Step 3 — Types (`[name].types.ts`)

```ts
export type [Name] = {
  id: string
  // your fields
  createdAt: Date
  updatedAt: Date
}

export type Create[Name]Input = {
  // fields required for insert (no id, no timestamps)
}

export type Update[Name]Input = Partial<Omit<Create[Name]Input, 'authorId'>>
```

Rules:

- Never infer types directly from Drizzle schema in UI
- Use `Omit<>` for safe objects (e.g. strip `passwordHash`)
- Add `WithRelation` types when repo uses `with` (e.g. `[Name]WithAuthor`)

## Step 4 — Validation (`[name].validation.ts`)

```ts
import { z } from 'zod'

export const create[Name]Schema = z.object({
  // mirror Create[Name]Input but without server-set fields (authorId, etc.)
})

export type Create[Name]SchemaType = z.infer<typeof create[Name]Schema>

export const update[Name]Schema = create[Name]Schema.partial()

export type Update[Name]SchemaType = z.infer<typeof update[Name]Schema>
```

Rules:

- Schema fields = what the CLIENT sends (never `authorId`, `id`, timestamps)
- `authorId` comes from JWT via `getUserFromRequest` in the route
- Use `.partial()` for update schemas
- Add `.min()`, `.max()`, `.regex()` constraints where appropriate

## Step 5 — Repo (`[name].repo.ts`)

```ts
import { db } from '@/db/drizzle'
import { [name]Table } from './[name].schema'
import { eq } from 'drizzle-orm'
import { Create[Name]Input, Update[Name]Input } from './[name].types'

export const [name]Repo = {
  create: async (data: Create[Name]Input) => {
    const [item] = await db.insert([name]Table).values(data).returning()
    return item
  },

  findAll: async () => {
    return db.query.[name]Table.findMany({
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    })
  },

  findById: async (id: string) => {
    return db.query.[name]Table.findFirst({
      where: eq([name]Table.id, id),
    })
  },

  update: async (id: string, data: Update[Name]Input) => {
    const [item] = await db
      .update([name]Table)
      .set({ ...data, updatedAt: new Date() })
      .where(eq([name]Table.id, id))
      .returning()
    return item
  },

  delete: async (id: string) => {
    await db.delete([name]Table).where(eq([name]Table.id, id))
  },
}
```

Rules:

- Only DB queries — no business logic
- Use `db.query.*` for reads with relations (`with`)
- Use `db.insert/update/delete` for writes
- Always `.returning()` on insert/update

## Step 6 — Service (`[name].service.ts`)

```ts
import { [name]Repo } from './[name].repo'
import { Create[Name]Input, Update[Name]Input } from './[name].types'
import { HttpError } from '@/lib/errors/http-error'

export const [name]Service = {
  create: async (data: Create[Name]Input) => {
    return [name]Repo.create(data)
  },

  getAll: async () => {
    return [name]Repo.findAll()
  },

  getById: async (id: string) => {
    const item = await [name]Repo.findById(id)
    if (!item) throw new HttpError(404, '[Name] not found')
    return item
  },

  update: async (id: string, userId: string, data: Update[Name]Input) => {
    const item = await [name]Repo.findById(id)
    if (!item) throw new HttpError(404, '[Name] not found')
    if (item.authorId !== userId) throw new HttpError(403, 'Forbidden')
    return [name]Repo.update(id, data)
  },

  delete: async (id: string, userId: string) => {
    const item = await [name]Repo.findById(id)
    if (!item) throw new HttpError(404, '[Name] not found')
    if (item.authorId !== userId) throw new HttpError(403, 'Forbidden')
    return [name]Repo.delete(id)
  },
}
```

Rules:

- All business logic lives here
- Throw `HttpError` — never return error objects
- Ownership checks belong here, not in routes
- Service must NOT import `Request` or `Response`

## Step 7 — Barrel export (`index.ts`)

```ts
export * from './[name].schema';
export * from './[name].relations';
export * from './[name].types';
export * from './[name].validation';
export * from './[name].repo';
export * from './[name].service';
```

## Checklist

After generating all files, remind the user to:

- [ ] Run `npx drizzle-kit generate` to create migration
- [ ] Run `npx drizzle-kit push` to apply to DB
- [ ] Register `[name]Table` and `[name]Relations` in `db/drizzle.ts`
- [ ] Add reverse relations to related modules (e.g. `many([name]Table)` on `postRelations`)
- [ ] Create API routes (see `nextjs-api-route` skill)
- [ ] Create SWR hooks (see `swr-hooks` skill)
