import Stripe from 'stripe';
import { orderRepo } from './order.repo';

export const orderService = {
  createFromSession: async (
    userId: string,
    session: Stripe.Checkout.Session,
  ) => {
    const existing = await orderRepo.findBySessionId(session.id);
    if (existing) return existing;

    return orderRepo.create({
      userId,
      stripeSessionId: session.id,
      status: 'completed',
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
    });
  },

  getByUserId: async (userId: string) => {
    return orderRepo.findByUserId(userId);
  },
};
