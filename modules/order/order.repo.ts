import { db } from '@/db/drizzle';
import { orderTable } from './order.schema';
import { count, eq } from 'drizzle-orm';
import { CreateOrderInput } from './order.types';

export const orderRepo = {
  create: async (data: CreateOrderInput) => {
    const [order] = await db.insert(orderTable).values(data).returning();
    return order;
  },

  findBySessionId: async (stripeSessionId: string) => {
    return db.query.orderTable.findFirst({
      where: eq(orderTable.stripeSessionId, stripeSessionId),
    });
  },

  findByUserId: async (userId: string) => {
    return db.query.orderTable.findMany({
      where: eq(orderTable.userId, userId),
    });
  },

  countCompleted: async () => {
    const [row] = await db
      .select({ value: count() })
      .from(orderTable)
      .where(eq(orderTable.status, 'completed'));
    return row?.value ?? 0;
  },
};
