import { creditRepo } from './credit.repo';
import { HttpError } from '@/lib/errors';

export const creditService = {
  addCredits: async (userId: string, amount: number, description?: string) => {
    return creditRepo.createTransaction({
      userId,
      amount,
      type: 'purchase',
      description,
    });
  },

  deductCredits: async (
    userId: string,
    amount: number,
    description: string,
  ) => {
    const balance = await creditRepo.getBalance(userId);
    if (balance < amount) throw new HttpError(402, 'Insufficient credits');
    return creditRepo.createTransaction({
      userId,
      amount: -amount,
      type: 'usage',
      description,
    });
  },

  getBalance: async (userId: string) => {
    return creditRepo.getBalance(userId);
  },

  getHistory: async (userId: string) => {
    return creditRepo.getByUserId(userId);
  },
};
