import { relations } from 'drizzle-orm';
import { creditTransactionTable } from './credit.schema';
import { userTable } from '@/modules/user/user.schema';

export const creditTransactionRelations = relations(
  creditTransactionTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [creditTransactionTable.userId],
      references: [userTable.id],
    }),
  }),
);
