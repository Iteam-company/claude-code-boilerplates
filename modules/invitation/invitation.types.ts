import { OrgRole } from '@/modules/orgMember/orgMember.schema';

export interface Invitation {
  id: string;
  orgId: string;
  email: string;
  role: OrgRole;
  token: string;
  invitedByUserId: string;
  status: 'pending' | 'accepted';
  expiresAt: Date;
  createdAt: Date;
}

export interface CreateInvitationInput {
  orgId: string;
  email: string;
  role: OrgRole;
  token: string;
  invitedByUserId: string;
  expiresAt: Date;
}

export interface InvitationDetails {
  id: string;
  email: string;
  role: OrgRole;
  status: 'pending' | 'accepted';
  expiresAt: Date;
  organization: { id: string; name: string };
  isNewUser: boolean;
}
