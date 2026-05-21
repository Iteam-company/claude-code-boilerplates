import { z } from 'zod';

export const createLeadSchema = z.object({
  email: z.string().email('Invalid email address'),
  tierInterest: z.enum(['free', 'pro']).default('free'),
  signupSource: z.string().max(100).optional(),
});

export type CreateLeadData = z.infer<typeof createLeadSchema>;
