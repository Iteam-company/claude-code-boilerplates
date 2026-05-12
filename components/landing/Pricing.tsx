import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';

export async function Pricing() {
  const t = await getTranslations('landing.pricing');
  const tPlans = await getTranslations('pricing');

  const plans = [
    {
      key: 'proLicense' as const,
      name: tPlans('proLicense.name'),
      description: tPlans('proLicense.description'),
      price: tPlans('proLicense.price'),
      period: null,
      features: [
        tPlans('proLicense.feature1'),
        tPlans('proLicense.feature2'),
        tPlans('proLicense.feature3'),
        tPlans('proLicense.feature4'),
      ],
      highlighted: false,
    },
    {
      key: 'proPlan' as const,
      name: tPlans('proPlan.name'),
      description: tPlans('proPlan.description'),
      price: tPlans('proPlan.price'),
      period: tPlans('proPlan.period'),
      features: [
        tPlans('proPlan.feature1'),
        tPlans('proPlan.feature2'),
        tPlans('proPlan.feature3'),
        tPlans('proPlan.feature4'),
      ],
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            {t('subheading')}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={cn(
                'flex flex-col rounded-xl border p-8',
                plan.highlighted ? 'border-primary' : 'border-border bg-card',
              )}
            >
              <h3 className="text-foreground text-xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-foreground text-4xl font-bold">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground">/{plan.period}</span>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckIcon className="text-primary h-4 w-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={ROUTES.CHECKOUT}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 py-3 text-sm font-medium transition-colors"
          >
            {t('cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
