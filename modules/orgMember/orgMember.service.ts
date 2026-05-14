import { orgMemberRepo } from './orgMember.repo';
import { OrgRole } from './orgMember.schema';
import { HttpError } from '@/lib/errors/http-error';

export const orgMemberService = {
  listMembers: async (orgId: string, requesterId: string) => {
    const requester = await orgMemberRepo.findByOrgAndUser(orgId, requesterId);
    if (!requester)
      throw new HttpError(403, 'You are not a member of this organization');
    return orgMemberRepo.findByOrgId(orgId);
  },

  updateRole: async (
    orgId: string,
    memberId: string,
    newRole: OrgRole,
    requesterId: string,
  ) => {
    const requester = await orgMemberRepo.findByOrgAndUser(orgId, requesterId);
    if (!requester)
      throw new HttpError(403, 'You are not a member of this organization');
    if (requester.role !== 'owner' && requester.role !== 'admin') {
      throw new HttpError(403, 'Only admins and owners can change roles');
    }

    const target = await orgMemberRepo.findById(memberId);
    if (!target || target.orgId !== orgId)
      throw new HttpError(404, 'Member not found');
    if (target.userId === requesterId)
      throw new HttpError(403, 'You cannot change your own role');
    if (target.role === 'owner')
      throw new HttpError(403, 'Cannot change the owner role');
    if (newRole === 'owner')
      throw new HttpError(403, 'Cannot assign owner role this way');

    return orgMemberRepo.updateRole(memberId, newRole);
  },

  removeMember: async (
    orgId: string,
    memberId: string,
    requesterId: string,
  ) => {
    const requester = await orgMemberRepo.findByOrgAndUser(orgId, requesterId);
    if (!requester)
      throw new HttpError(403, 'You are not a member of this organization');
    if (requester.role !== 'owner' && requester.role !== 'admin') {
      throw new HttpError(403, 'Only admins and owners can remove members');
    }

    const target = await orgMemberRepo.findById(memberId);
    if (!target || target.orgId !== orgId)
      throw new HttpError(404, 'Member not found');
    if (target.role === 'owner')
      throw new HttpError(403, 'Cannot remove the owner');

    await orgMemberRepo.delete(memberId);
  },
};
