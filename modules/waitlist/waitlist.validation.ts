import { z } from 'zod';

export const addEmailSchema = z.object({
  email: z.string().email(),
  plan: z.enum(['free', 'pro']),
});

export const addGithubSchema = z.object({
  email: z.string().email(),
  githubUsername: z.string().min(1).max(39),
});
