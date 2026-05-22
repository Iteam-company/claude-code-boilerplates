import { z } from 'zod';

export const addEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  tier: z.enum(['free', 'pro']),
});

export const addGithubSchema = z.object({
  email: z.string().email('Invalid email address'),
  githubUsername: z.string().min(1).max(39),
});
