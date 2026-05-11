export type Subscription = {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateSubscriptionInput = {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd?: boolean;
};

export type UpdateSubscriptionInput = Partial<
  Pick<
    Subscription,
    'status' | 'currentPeriodEnd' | 'cancelAtPeriodEnd' | 'stripePriceId'
  >
>;
