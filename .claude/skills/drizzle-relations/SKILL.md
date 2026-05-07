---
name: drizzle-relations
description: Define Drizzle ORM relations correctly so that db.query.* with `with` works without errors. Use this skill whenever the user gets a "referencedTable" error, asks how to use `with` in a Drizzle query, needs to add a relation between tables, or creates a new schema file. This is a common gotcha — always apply this skill when relations are involved.
---

# Drizzle Relations Skill

Drizzle's `db.query.*` API with `with` (eager loading) requires explicit relation definitions. Without them you get:

```
TypeError: Cannot read properties of undefined (reading 'referencedTable')
```

## The two things required

1. A `*.relations.ts` file for every table that has relations
2. All schemas AND relations registered in `db/drizzle.ts`

Both are required. Missing either one causes the error.

## Relation patterns

### Many-to-one (foreign key side)

```ts
// comment belongs to a post and a user
import { relations } from 'drizzle-orm';
import { commentTable } from './comment.schema';
import { userTable } from '@/modules/user/user.schema';
import { postTable } from '@/modules/post/post.schema';

export const commentRelations = relations(commentTable, ({ one }) => ({
  author: one(userTable, {
    fields: [commentTable.authorId],
    references: [userTable.id],
  }),
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
  }),
}));
```

### One-to-many (primary key side)

```ts
// post has many comments and many likes
import { relations } from 'drizzle-orm';
import { postTable } from './post.schema';
import { commentTable } from '@/modules/comment/comment.schema';
import { likeTable } from '@/modules/like/like.schema';
import { userTable } from '@/modules/user/user.schema';

export const postRelations = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
  }),
  comments: many(commentTable),
  likes: many(likeTable),
}));
```

### Many-to-many (via junction table)

```ts
// postToTag junction
export const postToTagRelations = relations(postToTagTable, ({ one }) => ({
  post: one(postTable, {
    fields: [postToTagTable.postId],
    references: [postTable.id],
  }),
  tag: one(tagTable, {
    fields: [postToTagTable.tagId],
    references: [tagTable.id],
  }),
}));

// post side
export const postRelations = relations(postTable, ({ many }) => ({
  tags: many(postToTagTable),
}));

// tag side
export const tagRelations = relations(tagTable, ({ many }) => ({
  posts: many(postToTagTable),
}));
```

## Registering in `db/drizzle.ts`

Every table AND its relations file must be in the schema object:

```ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import { userTable } from '@/modules/user/user.schema';
import { userRelations } from '@/modules/user/user.relations';
import { postTable } from '@/modules/post/post.schema';
import { postRelations } from '@/modules/post/post.relations';
import { commentTable } from '@/modules/comment/comment.schema';
import { commentRelations } from '@/modules/comment/comment.relations';
import { likeTable } from '@/modules/like/like.schema';
import { likeRelations } from '@/modules/like/like.relations';

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {
  schema: {
    userTable,
    userRelations,
    postTable,
    postRelations,
    commentTable,
    commentRelations,
    likeTable,
    likeRelations,
  },
});
```

## Using relations in queries

```ts
// with one level of relation
db.query.commentTable.findMany({
  where: eq(commentTable.postId, postId),
  with: {
    author: {
      columns: { id: true, email: true }, // select specific columns
    },
  },
});

// with nested relations
db.query.postTable.findFirst({
  where: eq(postTable.slug, slug),
  with: {
    author: true,
    comments: {
      with: {
        author: true,
      },
    },
  },
});

// exclude heavy columns from listings
db.query.postTable.findMany({
  columns: { content: false }, // exclude content field
});
```

## Checklist when adding a new table

- [ ] Create `[name].schema.ts`
- [ ] Create `[name].relations.ts`
- [ ] Add reverse relation to related tables (e.g. add `many([name]Table)` to post relations)
- [ ] Register both `[name]Table` and `[name]Relations` in `db/drizzle.ts`
- [ ] Run `npx drizzle-kit generate && npx drizzle-kit push`

## Common errors

| Error                                                             | Cause                                       | Fix                                     |
| ----------------------------------------------------------------- | ------------------------------------------- | --------------------------------------- |
| `Cannot read properties of undefined (reading 'referencedTable')` | Relations not registered in `db/drizzle.ts` | Add to schema object                    |
| `relation X not found`                                            | `with` key doesn't match relation name      | Check relation name in `*.relations.ts` |
| Type error on `with`                                              | Relations file missing                      | Create `*.relations.ts`                 |
