import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getUserFromRequest } from '@/lib/auth';
import { handleError, HttpError } from '@/lib/errors';
import { subscriptionRepo } from '@/modules/subscription/subscription.repo';

export async function POST(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);

    const subscription = await subscriptionRepo.findByUserId(userId);
    if (!subscription?.stripeCustomerId)
      throw new HttpError(400, 'No billing account found');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${baseUrl}/account`,
    });

    return Response.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Stripe.errors.StripeError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return handleError(error);
  }
}
