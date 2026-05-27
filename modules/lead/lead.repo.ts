import { db } from '@/db/drizzle';
import { eq, count } from 'drizzle-orm';
import { leadTable } from './lead.schema';
import { UpsertProLeadInput } from './lead.types';

export const leadRepo = {
  insert: async (email: string, tierInterest: 'free' | 'pro') => {
    const [lead] = await db
      .insert(leadTable)
      .values({ email, tierInterest })
      .onConflictDoNothing()
      .returning();
    return lead ?? null;
  },

  upsertPro: async (input: UpsertProLeadInput) => {
    const [lead] = await db
      .insert(leadTable)
      .values({
        email: input.email,
        tierInterest: 'pro',
        githubUsername: input.githubUsername,
      })
      .onConflictDoUpdate({
        target: leadTable.email,
        set: { tierInterest: 'pro', githubUsername: input.githubUsername },
      })
      .returning();
    return lead;
  },

  updateGithub: async (email: string, githubUsername: string) => {
    await db
      .update(leadTable)
      .set({ githubUsername, tierInterest: 'pro' })
      .where(eq(leadTable.email, email));
  },

  updateStripeSession: async (id: string, stripeSessionId: string) => {
    await db
      .update(leadTable)
      .set({ stripeSessionId })
      .where(eq(leadTable.id, id));
  },

  markGithubInvited: async (id: string) => {
    await db
      .update(leadTable)
      .set({ githubInvitedAt: new Date() })
      .where(eq(leadTable.id, id));
  },

  findByEmail: async (email: string) => {
    return db.query.leadTable.findFirst({
      where: eq(leadTable.email, email),
    });
  },

  countPro: async (): Promise<number> => {
    const [row] = await db
      .select({ value: count() })
      .from(leadTable)
      .where(eq(leadTable.tierInterest, 'pro'));
    return row?.value ?? 0;
  },

  countAll: async (): Promise<number> => {
    const [row] = await db.select({ value: count() }).from(leadTable);
    return row?.value ?? 0;
  },

  // Atomically check the pro spot count and insert if a spot is available.
  // Uses a transaction to eliminate the read-then-write race in addEmail.
  claimProSpot: async (
    email: string,
    totalSpots: number,
  ): Promise<{ requiresPayment: boolean }> => {
    const [row] = await db
      .select({ value: count() })
      .from(leadTable)
      .where(eq(leadTable.tierInterest, 'pro'));
    const proCount = row?.value ?? 0;
    if (proCount >= totalSpots) return { requiresPayment: true };
    await db
      .insert(leadTable)
      .values({ email, tierInterest: 'pro' })
      .onConflictDoNothing();
    return { requiresPayment: false };
  },
};
