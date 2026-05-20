import { z } from 'zod';

export const checkoutSchema = z.object({
  priceId: z.string().min(1),
  mode: z.enum(['payment', 'subscription']).default('payment'),
  quantity: z.number().int().positive().optional().default(1),
  // Set type='credits' and credits=N to buy credits instead of a regular order
  type: z.enum(['order', 'credits']).optional().default('order'),
  credits: z.number().int().positive().optional(),
  customer_email: z.string().email(),
  source: z.string().optional(),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
