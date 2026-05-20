import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const leadTable = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  tierInterest: text('tier_interest').notNull().default('free'),
  signupSource: text('signup_source'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
