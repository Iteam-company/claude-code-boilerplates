import { stripe } from '@/lib/stripe';

export const TOTAL_PRO_SPOTS = 100;

export async function countProSpotsTaken(): Promise<number> {
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? '';
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
      if (items.some((item) => item.price?.id === priceId)) {
        taken++;
      }
    }

    hasMore = sessions.has_more;
    startingAfter = sessions.data.at(-1)?.id;
  }

  return taken;
}
