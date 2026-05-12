---
name: db-patterns
description: Database access patterns, query rules, and migration conventions using Drizzle ORM + Neon. Loaded when writing queries, repositories, or migrations.
---

# DB Patterns

## Structure

```
db/
├── drizzle.ts   ← db client; all tables + relations registered here
└── schema.ts    ← re-exports all table schemas for drizzle-kit

modules/[name]/
├── [name].schema.ts     ← pgTable definition
├── [name].relations.ts  ← Drizzle relations (required for `with`)
└── [name].repo.ts       ← all DB queries for this entity
```

- Never query the DB in route handlers or components
- One repo per module — all queries for an entity live in `[name].repo.ts`

## Queries

Use `db.query.*` for reads with relations, `db.insert/update/delete` for writes:

```ts
// read with relation
db.query.postTable.findMany({
  where: eq(postTable.authorId, userId),
  orderBy: (t, { desc }) => [desc(t.createdAt)],
  with: { author: { columns: { id: true, name: true } } },
});

// write — always .returning()
const [post] = await db.insert(postTable).values(data).returning();
const [updated] = await db
  .update(postTable)
  .set(data)
  .where(eq(postTable.id, id))
  .returning();
await db.delete(postTable).where(eq(postTable.id, id));
```

- Select only needed columns with `columns:` — never fetch everything when only a subset is used
- Use `with:` for eager loading relations (requires `[name].relations.ts` — see drizzle-relations skill)

## Migrations

```bash
npx drizzle-kit generate   # generate SQL migration from schema changes
npx drizzle-kit push       # apply migration to DB (dev)
```

- Never edit existing migration files — always generate a new one
- Migration files live in `migrations/`

## Registering new tables

Every new table AND its relations file must be added to `db/drizzle.ts`:

```ts
import { newTable } from '@/modules/new/new.schema';
import { newRelations } from '@/modules/new/new.relations';

export const db = drizzle(sql, {
  schema: {
    // ...existing entries
    newTable,
    newRelations,
  },
});
```

Also add to `db/schema.ts`:

```ts
export * from '@/modules/new/new.schema';
```

## Rules

- Never raw SQL in application code — always use Drizzle query builder
- Never access `db` in route handlers — go through the repo layer
- Index any column used in `WHERE` or `JOIN`
- Prefer soft delete (`deletedAt` timestamp) unless hard delete is explicitly required
