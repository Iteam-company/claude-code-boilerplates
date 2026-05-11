import { PricingCard } from './PricingCard';

const PLANS = [
  {
    name: 'Pro License',
    description: 'One-time purchase. Lifetime access.',
    price: '$49',
    priceId:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? 'price_REPLACE_ME',
    mode: 'payment' as const,
    features: [
      { text: 'Full source code access' },
      { text: 'All current features' },
      { text: 'Lifetime updates' },
      { text: 'Community support' },
    ],
    ctaLabel: 'Buy License',
  },
  {
    name: 'Pro Plan',
    description: 'Everything in Pro License, plus ongoing perks.',
    price: '$19',
    period: 'month',
    priceId:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION ?? 'price_REPLACE_ME',
    mode: 'subscription' as const,
    features: [
      { text: 'Full source code access' },
      { text: 'All current + future features' },
      { text: '100 AI credits / month' },
      { text: 'Priority support' },
    ],
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          Simple pricing
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Choose the plan that works for you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <p className="text-muted-foreground mt-10 text-center text-sm">
        All prices in USD. Subscriptions can be cancelled anytime.
      </p>
    </section>
  );
}
