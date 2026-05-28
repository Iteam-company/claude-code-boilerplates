import { z } from 'zod';

export const createPostSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers and hyphens',
    ),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string().min(1).max(50)).max(10).default([]),
  published: z.boolean().optional(),
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;

export const updatePostSchema = createPostSchema.partial().extend({
  published: z.boolean().optional(),
});

export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>;
