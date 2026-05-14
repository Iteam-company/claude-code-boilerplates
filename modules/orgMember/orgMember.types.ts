import { OrgRole } from './orgMember.schema';
import { Organization } from '@/modules/organization/organization.types';

export const MANAGER_ROLES = ['owner', 'admin'] as const satisfies OrgRole[];

export interface OrgMember {
  id: string;
  orgId: string;
  userId: string;
  role: OrgRole;
  createdAt: Date;
}

export interface CreateOrgMemberInput {
  orgId: string;
  userId: string;
  role: OrgRole;
}

export interface OrgMemberWithUser extends OrgMember {
  user: { id: string; email: string };
}

export interface OrgMemberWithOrg extends OrgMember {
  organization: Organization;
  role: OrgRole;
}
