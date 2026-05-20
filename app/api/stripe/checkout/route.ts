import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { handleError, HttpError } from '@/lib/errors';
import { checkoutSchema } from '@/modules/order/order.validation';
import { getBaseUrl } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);

    const { priceId, mode, quantity, type, credits, customer_email } =
      parsed.data;
    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode,
      customer_email,
      line_items: [{ price: priceId, quantity }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        type,
        ...(credits ? { credits: String(credits) } : {}),
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
