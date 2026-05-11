import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),

  emailVerified: boolean('email_verified').default(false).notNull(),
  emailVerificationToken: text('email_verification_token'),

  passwordResetToken: text('password_reset_token'),
  passwordResetTokenExpiresAt: timestamp('password_reset_token_expires_at', {
    withTimezone: true,
  }),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
