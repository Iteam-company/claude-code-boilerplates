import Stripe from 'stripe';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';
import { handleError, HttpError } from '@/lib/errors';
import { getBaseUrl } from '@/lib/utils';

const checkoutSchema = z.object({
  priceId: z.string().min(1),
  mode: z.enum(['payment', 'subscription']).default('payment'),
  quantity: z.number().int().positive().optional().default(1),
  customer_email: z.string().email(),
  source: z.string().optional(),
  tier: z.enum(['pro']).optional(),
  github_username: z.string().min(1).max(39).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);

    const {
      priceId,
      mode,
      quantity,
      customer_email,
      source,
      tier,
      github_username,
    } = parsed.data;
    const baseUrl = getBaseUrl();

    if (mode === 'payment' && customer_email) {
      const existing = await stripe.checkout.sessions.list({
        customer_details: { email: customer_email },
        status: 'complete',
        limit: 1,
        expand: ['data.line_items'],
      });
      const alreadyPaid = existing.data.some((s) =>
        s.line_items?.data.some((item) => item.price?.id === priceId),
      );
      if (alreadyPaid) {
        throw new HttpError(
          409,
          'This email already has access. Check your inbox for the download link.',
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      customer_email,
      line_items: [{ price: priceId, quantity }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}${source ? `&source=${encodeURIComponent(source)}` : ''}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        ...(source ? { source } : {}),
        ...(tier === 'pro' && github_username
          ? { tier: 'pro', github_username }
          : {}),
      },
    });

    return Response.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Stripe.errors.StripeError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return handleError(error);
  }
}
