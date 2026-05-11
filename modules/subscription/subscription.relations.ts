import { relations } from 'drizzle-orm';
import { subscriptionTable } from './subscription.schema';
import { userTable } from '@/modules/user/user.schema';

export const subscriptionRelations = relations(
  subscriptionTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [subscriptionTable.userId],
      references: [userTable.id],
    }),
  }),
);
