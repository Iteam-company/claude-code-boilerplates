import Stripe from 'stripe';
import { subscriptionRepo } from './subscription.repo';

export const subscriptionService = {
  activateFromSubscription: async (
    userId: string,
    stripeCustomerId: string,
    subscription: Stripe.Subscription,
  ) => {
    const existing = await subscriptionRepo.findByStripeSubscriptionId(
      subscription.id,
    );
    if (existing) return existing;

    const item = subscription.items.data[0];
    return subscriptionRepo.create({
      userId,
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: item?.price.id ?? '',
      status: subscription.status,
      currentPeriodEnd: item?.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  },

  sync: async (subscription: Stripe.Subscription) => {
    const item = subscription.items.data[0];
    return subscriptionRepo.updateByStripeSubscriptionId(subscription.id, {
      status: subscription.status,
      stripePriceId: item?.price.id,
      currentPeriodEnd: item?.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  },

  renewBySubscriptionId: async (stripeSubscriptionId: string) => {
    return subscriptionRepo.updateByStripeSubscriptionId(stripeSubscriptionId, {
      status: 'active',
    });
  },

  markPastDue: async (stripeSubscriptionId: string) => {
    return subscriptionRepo.updateByStripeSubscriptionId(stripeSubscriptionId, {
      status: 'past_due',
    });
  },

  deactivate: async (stripeSubscriptionId: string) => {
    return subscriptionRepo.updateByStripeSubscriptionId(stripeSubscriptionId, {
      status: 'canceled',
    });
  },

  getActiveByUserId: async (userId: string) => {
    const sub = await subscriptionRepo.findByUserId(userId);
    return sub?.status === 'active' ? sub : null;
  },

  getByUserId: async (userId: string) => {
    return subscriptionRepo.findByUserId(userId);
  },
};
