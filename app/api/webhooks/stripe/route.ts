import { stripe } from '@/lib/stripe';
import { handleError } from '@/lib/errors';
import { headers } from 'next/headers';
import { waitlistService } from '@/modules/waitlist';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      return Response.json({ error: 'Missing signature' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        if (session.metadata?.source === 'waitlist') {
          const email =
            session.customer_email ?? session.customer_details?.email;
          if (email) {
            await waitlistService.markPaid(email, session.id);
          }
        }
        break;
      }
      default:
        break;
    }

    return Response.json({ received: true });
  } catch (error: unknown) {
    return handleError(error);
  }
}
