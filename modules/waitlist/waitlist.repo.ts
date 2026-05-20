import { db } from '@/db/drizzle';
import { waitlistTable } from './waitlist.schema';
import { eq, count } from 'drizzle-orm';

export const waitlistRepo = {
  async insert(data: { email: string; plan: 'free' | 'pro' }) {
    const [row] = await db
      .insert(waitlistTable)
      .values(data)
      .onConflictDoNothing()
      .returning();
    return row;
  },

  async updateGithub(email: string, githubUsername: string) {
    await db
      .update(waitlistTable)
      .set({ githubUsername })
      .where(eq(waitlistTable.email, email));
  },

  async updateStripeSession(email: string, stripeSessionId: string) {
    await db
      .update(waitlistTable)
      .set({ stripeSessionId })
      .where(eq(waitlistTable.email, email));
  },

  async countPro(): Promise<number> {
    const [row] = await db
      .select({ value: count() })
      .from(waitlistTable)
      .where(eq(waitlistTable.plan, 'pro'));
    return row?.value ?? 0;
  },
};
