import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from '@/modules/user/user.schema';

export const creditTransactionTable = pgTable('credit_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(), // positive = purchase, negative = usage
  type: text('type').notNull(), // purchase | usage
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
