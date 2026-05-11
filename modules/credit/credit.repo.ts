import { db } from '@/db/drizzle';
import { creditTransactionTable } from './credit.schema';
import { eq, sum, desc } from 'drizzle-orm';
import { CreateCreditTransactionInput } from './credit.types';

export const creditRepo = {
  createTransaction: async (data: CreateCreditTransactionInput) => {
    const [tx] = await db
      .insert(creditTransactionTable)
      .values(data)
      .returning();
    return tx;
  },

  getBalance: async (userId: string): Promise<number> => {
    const result = await db
      .select({ total: sum(creditTransactionTable.amount) })
      .from(creditTransactionTable)
      .where(eq(creditTransactionTable.userId, userId));
    return Number(result[0]?.total ?? 0);
  },

  getByUserId: async (userId: string) => {
    return db.query.creditTransactionTable.findMany({
      where: eq(creditTransactionTable.userId, userId),
      orderBy: desc(creditTransactionTable.createdAt),
    });
  },
};
