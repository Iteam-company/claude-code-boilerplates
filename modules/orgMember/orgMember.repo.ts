import { db } from '@/db/drizzle';
import { orgMemberTable, OrgRole } from './orgMember.schema';
import { eq, and } from 'drizzle-orm';
import { CreateOrgMemberInput } from './orgMember.types';

export const orgMemberRepo = {
  create: async (data: CreateOrgMemberInput) => {
    const [member] = await db.insert(orgMemberTable).values(data).returning();
    return member;
  },

  findById: async (id: string) => {
    return db.query.orgMemberTable.findFirst({
      where: eq(orgMemberTable.id, id),
    });
  },

  findByOrgAndUser: async (orgId: string, userId: string) => {
    return db.query.orgMemberTable.findFirst({
      where: and(
        eq(orgMemberTable.orgId, orgId),
        eq(orgMemberTable.userId, userId),
      ),
    });
  },

  findByOrgId: async (orgId: string) => {
    return db.query.orgMemberTable.findMany({
      where: eq(orgMemberTable.orgId, orgId),
      with: {
        user: { columns: { id: true, email: true } },
      },
    });
  },

  findByUserId: async (userId: string) => {
    return db.query.orgMemberTable.findMany({
      where: eq(orgMemberTable.userId, userId),
      with: { organization: true },
    });
  },

  countOwners: async (orgId: string) => {
    const owners = await db.query.orgMemberTable.findMany({
      where: and(
        eq(orgMemberTable.orgId, orgId),
        eq(orgMemberTable.role, 'owner'),
      ),
    });
    return owners.length;
  },

  updateRole: async (id: string, role: OrgRole) => {
    const [member] = await db
      .update(orgMemberTable)
      .set({ role })
      .where(eq(orgMemberTable.id, id))
      .returning();
    return member;
  },

  delete: async (id: string) => {
    await db.delete(orgMemberTable).where(eq(orgMemberTable.id, id));
  },
};
