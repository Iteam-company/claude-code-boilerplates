import { getTranslations } from 'next-intl/server';
import { PricingCard } from './PricingCard';

export async function PricingSection() {
  const t = await getTranslations('pricing');
  const tc = await getTranslations('checkout');

  const PLANS = [
    {
      name: t('proLicense.name'),
      description: t('proLicense.description'),
      price: t('proLicense.price'),
      plan: 'free' as const,
      features: [
        { text: t('proLicense.feature1') },
        { text: t('proLicense.feature2') },
        { text: t('proLicense.feature3') },
        { text: t('proLicense.feature4') },
        { text: t('proLicense.feature5') },
        { text: t('proLicense.feature6') },
        { text: t('proLicense.feature7') },
      ],
      ctaLabel: t('proLicense.cta'),
    },
    {
      name: t('proPlan.name'),
      description: t('proPlan.description'),
      price: t('proPlan.price'),
      plan: 'pro' as const,
      priceId:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? 'price_REPLACE_ME',
      mode: 'payment' as const,
      features: [
        { text: t('proPlan.feature1') },
        { text: t('proPlan.feature2') },
        { text: t('proPlan.feature3') },
        { text: t('proPlan.feature4') },
        { text: t('proPlan.feature5') },
        { text: t('proPlan.feature6') },
        { text: t('proPlan.feature7') },
        { text: t('proPlan.feature8') },
        { text: t('proPlan.feature9') },
        { text: t('proPlan.feature10') },
      ],
      highlighted: true,
      ctaLabel: t('proPlan.cta'),
    },
  ];

  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          {tc('heading')}
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">{tc('subheading')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <p className="text-muted-foreground mt-10 text-center text-sm">
        {tc('disclaimer')}
      </p>
    </section>
  );
}
