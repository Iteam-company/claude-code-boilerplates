import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { leadTable } from './lead.schema';
import { CreateLeadInput } from './lead.types';

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

  findByEmail: async (email: string) => {
    return db.query.leadTable.findFirst({
      where: eq(leadTable.email, email),
    });
  },
};
