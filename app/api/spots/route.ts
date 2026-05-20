import { stripe } from '@/lib/stripe';
import { handleError } from '@/lib/errors';

const TOTAL_PRO_SPOTS = 100;
const PRO_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? '';

export async function GET() {
  try {
    let taken = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const sessions = await stripe.checkout.sessions.list({
        status: 'complete',
        limit: 100,
        expand: ['data.line_items'],
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      for (const session of sessions.data) {
        const items = session.line_items?.data ?? [];
        if (items.some((item) => item.price?.id === PRO_PRICE_ID)) {
          taken++;
        }
      }

      hasMore = sessions.has_more;
      startingAfter = sessions.data.at(-1)?.id;
    }

    const remaining = Math.max(0, TOTAL_PRO_SPOTS - taken);
    return Response.json({ taken, remaining, total: TOTAL_PRO_SPOTS });
  } catch (error: unknown) {
    return handleError(error);
  }
}
