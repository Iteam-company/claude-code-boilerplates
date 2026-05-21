import { stripe } from '@/lib/stripe';
import { handleError } from '@/lib/errors';
import { headers } from 'next/headers';
import { orderService } from '@/modules/order/order.service';
import { subscriptionService } from '@/modules/subscription/subscription.service';
import { creditService } from '@/modules/credit/credit.service';
import { leadService } from '@/modules/lead';
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

        if (session.metadata?.tier === 'pro') {
          await leadService.handleProCheckout(session);
          break;
        }

        if (session.metadata?.source === 'waitlist') {
          const email =
            session.customer_email ?? session.customer_details?.email;
          if (email) {
            await waitlistService.markPaid(email, session.id);
          }
          break;
        }

        const userId = session.metadata?.userId;
        if (!userId) break;

        if (
          session.mode === 'payment' &&
          session.metadata?.type === 'credits'
        ) {
          const credits = parseInt(session.metadata.credits ?? '0', 10);
          if (credits > 0) {
            await creditService.addCredits(
              userId,
              credits,
              'Credit purchase via Stripe',
            );
          }
        } else if (session.mode === 'payment') {
          await orderService.createFromSession(userId, session);
        } else if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );
          await subscriptionService.activateFromSubscription(
            userId,
            session.customer as string,
            subscription,
          );
        }
        break;
      }
      case 'customer.subscription.updated': {
        await subscriptionService.sync(event.data.object);
        break;
      }
      case 'customer.subscription.deleted': {
        await subscriptionService.deactivate(event.data.object.id);
        break;
      }
      case 'invoice.paid': {
        const invoice = event.data.object;
        const sub = invoice.parent?.subscription_details?.subscription;
        const stripeSubscriptionId = typeof sub === 'string' ? sub : sub?.id;
        if (stripeSubscriptionId) {
          await subscriptionService.renewBySubscriptionId(stripeSubscriptionId);
        }
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const sub = invoice.parent?.subscription_details?.subscription;
        const stripeSubscriptionId = typeof sub === 'string' ? sub : sub?.id;
        if (stripeSubscriptionId) {
          await subscriptionService.markPastDue(stripeSubscriptionId);
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
