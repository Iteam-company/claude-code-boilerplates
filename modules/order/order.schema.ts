import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from '@/modules/user/user.schema';

export const orderTable = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  status: text('status').notNull().default('pending'), // pending | completed | refunded
  amountTotal: integer('amount_total').notNull(), // in cents
  currency: text('currency').notNull().default('usd'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
