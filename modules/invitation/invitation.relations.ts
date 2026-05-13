import { relations } from 'drizzle-orm';
import { invitationTable } from './invitation.schema';
import { organizationTable } from '@/modules/organization/organization.schema';
import { userTable } from '@/modules/user/user.schema';

export const invitationRelations = relations(invitationTable, ({ one }) => ({
  organization: one(organizationTable, {
    fields: [invitationTable.orgId],
    references: [organizationTable.id],
  }),
  invitedBy: one(userTable, {
    fields: [invitationTable.invitedByUserId],
    references: [userTable.id],
  }),
}));
