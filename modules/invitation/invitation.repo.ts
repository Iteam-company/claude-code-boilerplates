import { db } from '@/db/drizzle';
import { invitationTable } from './invitation.schema';
import { eq, and } from 'drizzle-orm';
import { CreateInvitationInput } from './invitation.types';

export const invitationRepo = {
  create: async (data: CreateInvitationInput) => {
    const [invitation] = await db
      .insert(invitationTable)
      .values(data)
      .returning();
    return invitation;
  },

  findByToken: async (token: string) => {
    return db.query.invitationTable.findFirst({
      where: eq(invitationTable.token, token),
      with: {
        organization: { columns: { id: true, name: true } },
        invitedBy: { columns: { id: true, email: true } },
      },
    });
  },

  findPendingByOrgId: async (orgId: string) => {
    return db.query.invitationTable.findMany({
      where: and(
        eq(invitationTable.orgId, orgId),
        eq(invitationTable.status, 'pending'),
      ),
    });
  },

  findPendingByEmail: async (orgId: string, email: string) => {
    return db.query.invitationTable.findFirst({
      where: and(
        eq(invitationTable.orgId, orgId),
        eq(invitationTable.email, email),
        eq(invitationTable.status, 'pending'),
      ),
    });
  },

  accept: async (id: string) => {
    await db
      .update(invitationTable)
      .set({ status: 'accepted' })
      .where(eq(invitationTable.id, id));
  },

  delete: async (id: string) => {
    await db.delete(invitationTable).where(eq(invitationTable.id, id));
  },
};
