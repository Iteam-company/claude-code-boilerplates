import { z } from 'zod';

export const sendInvitationSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member']).default('member'),
});

export type SendInvitationSchemaType = z.infer<typeof sendInvitationSchema>;

export const acceptInvitationSchema = z.object({
  password: z.string().min(6).optional(),
});

export type AcceptInvitationSchemaType = z.infer<typeof acceptInvitationSchema>;
