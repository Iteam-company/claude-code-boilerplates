import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const leadTable = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  tierInterest: text('tier_interest').notNull().default('free'),
  signupSource: text('signup_source'),
  githubUsername: text('github_username'),
  githubInvitedAt: timestamp('github_invited_at', { withTimezone: true }),
  stripeSessionId: text('stripe_session_id'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
