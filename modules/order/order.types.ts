export type Order = {
  id: string;
  userId: string;
  stripeSessionId: string;
  status: string;
  amountTotal: number;
  currency: string;
  createdAt: Date;
};

export type CreateOrderInput = {
  userId: string;
  stripeSessionId: string;
  status: string;
  amountTotal: number;
  currency: string;
};
