import { relations } from 'drizzle-orm';
import { orderTable } from './order.schema';
import { userTable } from '@/modules/user/user.schema';

export const orderRelations = relations(orderTable, ({ one }) => ({
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
}));
