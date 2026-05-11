import { z } from 'zod';

export const deductCreditsSchema = z.object({
  amount: z.number().int().positive(),
  description: z.string().min(1),
});

export type DeductCreditsSchemaType = z.infer<typeof deductCreditsSchema>;
