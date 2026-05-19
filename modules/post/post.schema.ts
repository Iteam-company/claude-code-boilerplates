import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { userTable } from '@/modules/user/user.schema';

export const postTable = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),

  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(), // raw MDX string

  published: boolean('published').default(false).notNull(),
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
});
