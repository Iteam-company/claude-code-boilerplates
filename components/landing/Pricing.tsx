import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';
import { PricingCTAButton } from './PricingCTAButton';

interface Plan {
  key: string;
  name: string;
  description: string;
  price: string;
  period: string | null;
  cta: string;
  planType: 'free' | 'pro';
  features: string[];
  highlighted: boolean;
}

function PricingPlanCard({
  name,
  description,
  price,
  period,
  cta,
  planType,
  features,
  highlighted,
}: Plan) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border p-8',
        highlighted ? 'border-primary shadow-lg' : 'border-border bg-card',
      )}
    >
      {highlighted && (
        <div className="bg-primary/10 text-primary mb-4 self-start rounded-full px-3 py-0.5 text-xs font-semibold">
          Best value
        </div>
      )}
      <h3 className="text-foreground text-xl font-bold">{name}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-foreground text-4xl font-bold">{price}</span>
        {period && <span className="text-muted-foreground">/{period}</span>}
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckIcon className="text-primary h-4 w-4 shrink-0" />
            <span className="text-muted-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <PricingCTAButton plan={planType} label={cta} highlighted={highlighted} />
    </div>
  );
}

export async function Pricing() {
  const t = await getTranslations('landing.pricing');
  const tPlans = await getTranslations('pricing');

  const plans: Plan[] = [
    {
      key: 'proLicense',
      name: tPlans('proLicense.name'),
      description: tPlans('proLicense.description'),
      price: tPlans('proLicense.price'),
      period: null,
      cta: tPlans('proLicense.cta'),
      planType: 'free',
      features: [
        tPlans('proLicense.feature1'),
        tPlans('proLicense.feature2'),
        tPlans('proLicense.feature3'),
        tPlans('proLicense.feature4'),
        tPlans('proLicense.feature5'),
        tPlans('proLicense.feature6'),
        tPlans('proLicense.feature7'),
      ],
      highlighted: false,
    },
    {
      key: 'proPlan',
      name: tPlans('proPlan.name'),
      description: tPlans('proPlan.description'),
      price: tPlans('proPlan.price'),
      period: null,
      cta: tPlans('proPlan.cta'),
      planType: 'pro',
      features: [
        tPlans('proPlan.feature1'),
        tPlans('proPlan.feature2'),
        tPlans('proPlan.feature3'),
        tPlans('proPlan.feature4'),
        tPlans('proPlan.feature5'),
        tPlans('proPlan.feature6'),
        tPlans('proPlan.feature7'),
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
          {plans.map(({ key, ...plan }) => (
            <PricingPlanCard key={key} {...plan} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={ROUTES.PRICING}
            className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
          >
            {t('viewFull')} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
