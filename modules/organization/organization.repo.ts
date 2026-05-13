import { db } from '@/db/drizzle';
import { organizationTable } from './organization.schema';
import { eq } from 'drizzle-orm';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from './organization.types';

export const organizationRepo = {
  create: async (data: CreateOrganizationInput) => {
    const [org] = await db.insert(organizationTable).values(data).returning();
    return org;
  },

  findById: async (id: string) => {
    return db.query.organizationTable.findFirst({
      where: eq(organizationTable.id, id),
    });
  },

  findBySlug: async (slug: string) => {
    return db.query.organizationTable.findFirst({
      where: eq(organizationTable.slug, slug),
    });
  },

  update: async (id: string, data: UpdateOrganizationInput) => {
    const [org] = await db
      .update(organizationTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(organizationTable.id, id))
      .returning();
    return org;
  },

  delete: async (id: string) => {
    await db.delete(organizationTable).where(eq(organizationTable.id, id));
  },
};
