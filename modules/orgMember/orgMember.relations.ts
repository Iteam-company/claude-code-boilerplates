import { relations } from 'drizzle-orm';
import { orgMemberTable } from './orgMember.schema';
import { organizationTable } from '@/modules/organization/organization.schema';
import { userTable } from '@/modules/user/user.schema';

export const orgMemberRelations = relations(orgMemberTable, ({ one }) => ({
  organization: one(organizationTable, {
    fields: [orgMemberTable.orgId],
    references: [organizationTable.id],
  }),
  user: one(userTable, {
    fields: [orgMemberTable.userId],
    references: [userTable.id],
  }),
}));
