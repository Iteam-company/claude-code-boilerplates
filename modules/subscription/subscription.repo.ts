import { db } from '@/db/drizzle';
import { subscriptionTable } from './subscription.schema';
import { eq } from 'drizzle-orm';
import {
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
} from './subscription.types';

export const subscriptionRepo = {
  create: async (data: CreateSubscriptionInput) => {
    const [sub] = await db.insert(subscriptionTable).values(data).returning();
    return sub;
  },

  findByUserId: async (userId: string) => {
    return db.query.subscriptionTable.findFirst({
      where: eq(subscriptionTable.userId, userId),
    });
  },

  findByStripeSubscriptionId: async (stripeSubscriptionId: string) => {
    return db.query.subscriptionTable.findFirst({
      where: eq(subscriptionTable.stripeSubscriptionId, stripeSubscriptionId),
    });
  },

  findByStripeCustomerId: async (stripeCustomerId: string) => {
    return db.query.subscriptionTable.findFirst({
      where: eq(subscriptionTable.stripeCustomerId, stripeCustomerId),
    });
  },

  updateByStripeSubscriptionId: async (
    stripeSubscriptionId: string,
    data: UpdateSubscriptionInput,
  ) => {
    const [updated] = await db
      .update(subscriptionTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(subscriptionTable.stripeSubscriptionId, stripeSubscriptionId))
      .returning();
    return updated;
  },
};
