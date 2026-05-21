import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { leadTable } from './lead.schema';
import { CreateLeadInput, UpsertProLeadInput } from './lead.types';

export const leadRepo = {
  create: async (input: CreateLeadInput) => {
    const [lead] = await db
      .insert(leadTable)
      .values({
        email: input.email,
        tierInterest: input.tierInterest,
        signupSource: input.signupSource ?? null,
      })
      .returning();
    return lead;
  },

  upsertPro: async (input: UpsertProLeadInput) => {
    const [lead] = await db
      .insert(leadTable)
      .values({
        email: input.email,
        tierInterest: 'pro',
        githubUsername: input.githubUsername,
        signupSource: input.signupSource ?? null,
      })
      .onConflictDoUpdate({
        target: leadTable.email,
        set: {
          tierInterest: 'pro',
          githubUsername: input.githubUsername,
        },
      })
      .returning();
    return lead;
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
};
