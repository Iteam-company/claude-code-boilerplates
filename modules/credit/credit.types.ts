export type CreditTransaction = {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'usage';
  description: string | null;
  createdAt: Date;
};

export type CreateCreditTransactionInput = {
  userId: string;
  amount: number;
  type: 'purchase' | 'usage';
  description?: string;
};
