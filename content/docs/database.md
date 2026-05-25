---
title: Database
description: Drizzle ORM with Neon DB -- define your schema, run migrations, set up relations, and query your data using type-safe TypeScript without writing raw SQL.
order: 4
section: For Developers
---

# Database -- Drizzle ORM and Neon DB Setup

The boilerplate includes a pre-built `users` table. All other tables are added as you build features with Claude Code.

The project uses Drizzle ORM with Neon DB (serverless Postgres). All DB access goes through the repository layer in each module -- never directly from components or routes.

## Schema

Tables are defined in `modules/<name>/<name>.schema.ts`:

```ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const postTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: uuid('author_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

Naming rules:

- Table exports: `camelCase` + `Table` suffix (`postTable`, `userTable`)
- Table names: plural snake_case (`posts`, `users`)
- Column names: snake_case (`created_at`, `author_id`)

## Relations

Relations live in `modules/<name>/<name>.relations.ts`:

```ts
import { relations } from 'drizzle-orm';
import { postTable } from './post.schema';
import { userTable } from '@/modules/user/user.schema';

export const postRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
  }),
}));
```

Both the schema and relations must be registered in `db/drizzle.ts`.

## Migrations

After changing a schema:

```bash
npm run db:generate   # Generate SQL migration file
npm run db:migrate    # Apply to database
```

For quick local iteration (no migration file):

```bash
npm run db:push       # Dev only -- syncs schema directly
```

Use `npm run db:studio` to inspect your data in a visual UI.

## Repository pattern

All queries live in `modules/<name>/<name>.repo.ts`. No business logic here -- only typed DB calls:

```ts
import { db } from '@/db/drizzle';
import { postTable } from './post.schema';
import { eq } from 'drizzle-orm';
import type { NewPost } from './post.types';

export const postRepo = {
  async findAll() {
    return db.select().from(postTable).orderBy(postTable.createdAt);
  },

  async findById(id: string) {
    const rows = await db.select().from(postTable).where(eq(postTable.id, id));
    return rows[0] ?? null;
  },

  async create(data: NewPost) {
    const rows = await db.insert(postTable).values(data).returning();
    return rows[0];
  },
};
```

## Connecting to Neon

Set `DATABASE_URL` in `.env` to your Neon connection string. The DB client in `db/drizzle.ts` uses the `@neondatabase/serverless` driver, which works in both Node.js and edge runtimes.

You can point `DATABASE_URL` at any Postgres instance -- local, Supabase, Railway, etc.
