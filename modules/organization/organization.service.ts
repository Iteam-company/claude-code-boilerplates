import { organizationRepo } from './organization.repo';
import { orgMemberRepo } from '@/modules/orgMember/orgMember.repo';
import { HttpError } from '@/lib/errors/http-error';
import { Organization, UpdateOrganizationInput } from './organization.types';

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const ensureUniqueSlug = async (base: string): Promise<string> => {
  let slug = base;
  let i = 1;
  while (await organizationRepo.findBySlug(slug)) {
    slug = `${base}-${i++}`;
  }
  return slug;
};

export const organizationService = {
  create: async (name: string, ownerId: string): Promise<Organization> => {
    const slug = await ensureUniqueSlug(generateSlug(name));
    const org = await organizationRepo.create({ name, slug });
    await orgMemberRepo.create({
      orgId: org.id,
      userId: ownerId,
      role: 'owner',
    });
    return org;
  },

  listForUser: async (userId: string) => {
    const memberships = await orgMemberRepo.findByUserId(userId);
    return memberships.map((m) => ({ ...m.organization, role: m.role }));
  },

  getById: async (id: string, userId: string): Promise<Organization> => {
    const org = await organizationRepo.findById(id);
    if (!org) throw new HttpError(404, 'Organization not found');
    const member = await orgMemberRepo.findByOrgAndUser(id, userId);
    if (!member)
      throw new HttpError(403, 'You are not a member of this organization');
    return org;
  },

  update: async (
    id: string,
    userId: string,
    data: UpdateOrganizationInput,
  ): Promise<Organization> => {
    const member = await orgMemberRepo.findByOrgAndUser(id, userId);
    if (!member)
      throw new HttpError(403, 'You are not a member of this organization');
    if (member.role !== 'owner' && member.role !== 'admin') {
      throw new HttpError(
        403,
        'Only admins and owners can update the organization',
      );
    }
    return organizationRepo.update(id, data);
  },

  delete: async (id: string, userId: string): Promise<void> => {
    const member = await orgMemberRepo.findByOrgAndUser(id, userId);
    if (!member)
      throw new HttpError(403, 'You are not a member of this organization');
    if (member.role !== 'owner')
      throw new HttpError(403, 'Only the owner can delete the organization');
    await organizationRepo.delete(id);
  },
};
