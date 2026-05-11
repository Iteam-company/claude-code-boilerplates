---
name: stripe-payments
description: Integrate Stripe payments into a Next.js project — lib setup, checkout session API route, webhook handler, and CheckoutButton component. Use this skill whenever the user asks about payments, Stripe, checkout, subscriptions, pricing, or order processing. Always use this skill when adding any payment feature.
---

# Stripe Payments Skill

Handles Stripe Checkout sessions, webhooks, and payment confirmation in Next.js App Router.

## Setup

```bash
pnpm add stripe @stripe/stripe-js
```

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Get these from your Stripe dashboard → Developers → API Keys.
Get the webhook secret from Stripe dashboard → Developers → Webhooks → your endpoint → Signing secret.

## `lib/stripe.ts`

```ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});
```

## Stripe MCP

The Stripe MCP server is configured. Use MCP tools to:

- Create products and prices in the Stripe dashboard
- Look up customers, payment intents, and subscriptions
- List invoices and charges

Always use the MCP for read-only lookups and dashboard setup. Use the SDK (lib/stripe.ts) for programmatic operations in API routes.

---

## Checkout Session — `app/api/stripe/checkout/route.ts`

Creates a hosted Stripe Checkout session. Client redirects to Stripe, then returns to `success_url`.

```ts
import { stripe } from '@/lib/stripe';
import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import { HttpError } from '@/lib/errors';
import { z } from 'zod';

const schema = z.object({
  priceId: z.string().min(1),
  quantity: z.number().int().positive().optional().default(1),
});

export async function POST(req: Request) {
  try {
    const user = getUserFromRequest(req);

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);

    const { priceId, quantity } = parsed.data;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [{ price: priceId, quantity }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: { userId: String(user.id) },
    });

    return Response.json({ url: session.url });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

---

## Webhook Handler — `app/api/stripe/webhook/route.ts`

Verifies Stripe signature and processes events. Must use raw body — do NOT call `req.json()`.

```ts
import { stripe } from '@/lib/stripe';
import { handleError } from '@/lib/errors';
import { headers } from 'next/headers';

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
        const userId = session.metadata?.userId;
        // TODO: fulfil the order — e.g. orderService.createOrder(userId, session)
        break;
      }
      case 'payment_intent.payment_failed': {
        // TODO: notify user or log
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

// Stripe sends raw body — disable Next.js body parsing
export const runtime = 'nodejs';
```

**Important:** Add the webhook endpoint in your Stripe dashboard:
`https://your-domain.com/api/stripe/webhook`

For local testing use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## CheckoutButton Component — `components/CheckoutButton.tsx`

```tsx
'use client';

import { useState } from 'react';

interface Props {
  priceId: string;
  label?: string;
}

export function CheckoutButton({ priceId, label = 'Buy Now' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
    >
      {loading ? 'Redirecting…' : label}
    </button>
  );
}
```

---

## Success Page — `app/checkout/success/page.tsx`

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful',
  description: 'Your payment was processed successfully.',
};

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Payment Successful</h1>
      <p className="text-muted-foreground">Thank you for your purchase.</p>
    </main>
  );
}
```

---

## SWR Hook — `hooks/api/useCheckout.ts`

```ts
import useSWRMutation from 'swr/mutation';
import { poster } from '@/lib/fetcher';

interface CheckoutPayload {
  priceId: string;
  quantity?: number;
}

export function useCheckout() {
  return useSWRMutation(
    '/api/stripe/checkout',
    (url, { arg }: { arg: CheckoutPayload }) =>
      poster<{ url: string }>(url, arg),
  );
}
```

---

## Conventions

- Never log or store raw Stripe webhook payloads — they may contain PII
- Always verify webhook signatures — never trust unverified events
- Store only `stripeSessionId` or `stripeCustomerId` in the DB, never card data
- Use `metadata` on Stripe objects to link back to internal user/order IDs
- Test mode keys (`sk_test_`, `pk_test_`) must never be used in production
- For subscriptions, set `mode: 'subscription'` and handle `customer.subscription.updated` / `customer.subscription.deleted` events
- For one-time payments, set `mode: 'payment'`

## Order Module

When Stripe payments need to be persisted, scaffold an `order` module with `drizzle-module`:

```
modules/order/
  order.schema.ts     — orders table (userId, stripeSessionId, status, amountTotal)
  order.relations.ts
  order.types.ts
  order.validation.ts
  order.repo.ts
  order.service.ts
  order.index.ts
```

Register the schema in `db/drizzle.ts` and run `pnpm db:generate && pnpm db:migrate`.
