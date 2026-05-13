import { relations } from 'drizzle-orm';
import { organizationTable } from './organization.schema';
import { orgMemberTable } from '@/modules/orgMember/orgMember.schema';
import { invitationTable } from '@/modules/invitation/invitation.schema';

export const organizationRelations = relations(
  organizationTable,
  ({ many }) => ({
    members: many(orgMemberTable),
    invitations: many(invitationTable),
  }),
);
