import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  index,
} from 'drizzle-orm/pg-core';
import { userTable } from '@/modules/user/user.schema';

export const postTable = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    content: text('content').notNull(),

    published: boolean('published').default(false).notNull(),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    tags: text('tags').array().notNull().default([]),

    authorId: uuid('author_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index('posts_author_id_idx').on(t.authorId),
    index('posts_published_idx').on(t.published),
  ],
);
