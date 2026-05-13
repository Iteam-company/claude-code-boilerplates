import { pgEnum, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { organizationTable } from '@/modules/organization/organization.schema';
import { userTable } from '@/modules/user/user.schema';

export const orgRoleEnum = pgEnum('org_role', ['owner', 'admin', 'member']);

export type OrgRole = (typeof orgRoleEnum.enumValues)[number];

export const orgMemberTable = pgTable('org_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => organizationTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  role: orgRoleEnum('role').notNull().default('member'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
