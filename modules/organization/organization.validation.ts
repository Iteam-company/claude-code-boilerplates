import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(255),
});

export type CreateOrganizationSchemaType = z.infer<
  typeof createOrganizationSchema
>;

export const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(255),
});

export type UpdateOrganizationSchemaType = z.infer<
  typeof updateOrganizationSchema
>;
