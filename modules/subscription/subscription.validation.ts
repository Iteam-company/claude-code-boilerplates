import { z } from 'zod';

export const subscribeSchema = z.object({
  priceId: z.string().min(1),
});

export type SubscribeSchemaType = z.infer<typeof subscribeSchema>;
