import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { organizationTable } from '@/modules/organization/organization.schema';
import { userTable } from '@/modules/user/user.schema';
import { orgRoleEnum } from '@/modules/orgMember/orgMember.schema';

export const invitationStatusEnum = pgEnum('invitation_status', [
  'pending',
  'accepted',
]);

export const invitationTable = pgTable('invitations', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => organizationTable.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull(),
  role: orgRoleEnum('role').notNull().default('member'),
  token: text('token').notNull().unique(),
  invitedByUserId: uuid('invited_by_user_id')
    .notNull()
    .references(() => userTable.id),
  status: invitationStatusEnum('status').notNull().default('pending'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
