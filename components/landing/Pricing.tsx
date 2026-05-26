import { getTranslations } from 'next-intl/server';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { PricingCTAButton } from './PricingCTAButton';
import { FadeIn } from './FadeIn';

interface Props {
  isFreeProPlan: boolean;
  spotsClaimed?: number;
  totalSpots?: number;
}

export async function Pricing({
  isFreeProPlan,
  spotsClaimed = 0,
  totalSpots = 100,
}: Props) {
  const t = await getTranslations('landing.pricing');
  const tPlans = await getTranslations('pricing');
  const spotsLeft = Math.max(0, totalSpots - spotsClaimed);
  const pct = Math.min(100, Math.round((spotsClaimed / totalSpots) * 100));

  const freeFeatures = [
    tPlans('proLicense.feature1'),
    tPlans('proLicense.feature2'),
    tPlans('proLicense.feature3'),
    tPlans('proLicense.feature4'),
    tPlans('proLicense.feature5'),
    tPlans('proLicense.feature6'),
    tPlans('proLicense.feature7'),
  ];

  const proFeatures = [
    tPlans('proPlan.feature1'),
    tPlans('proPlan.feature2'),
    tPlans('proPlan.feature3'),
    tPlans('proPlan.feature4'),
    tPlans('proPlan.feature5'),
    tPlans('proPlan.feature6'),
    tPlans('proPlan.feature7'),
    tPlans('proPlan.feature8'),
    tPlans('proPlan.feature9'),
    tPlans('proPlan.feature10'),
  ];

  return (
    <section id="pricing" className="py-24">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              Two plans. One free forever. One free for 100 people.
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Free card */}
          <div className="border-border bg-card flex flex-col rounded-xl border p-8">
            <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
              {tPlans('proLicense.name')}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-foreground text-5xl font-bold">
                {tPlans('proLicense.price')}
              </span>
              <span className="text-muted-foreground text-sm">/ forever</span>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              {tPlans('proLicense.description')}
            </p>

            <ul className="mt-8 flex-1 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <CheckIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <PricingCTAButton
              plan="free"
              label="Get the free version →"
              highlighted={false}
            />

            <p className="text-muted-foreground mt-4 text-center text-xs">
              No credit card. No catch. MIT license.
            </p>
          </div>

          {/* Pro card */}
          <div className="border-primary bg-card flex flex-col rounded-xl border p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                {tPlans('proPlan.name')}
              </p>
              {isFreeProPlan && (
                <span className="bg-primary/10 text-primary rounded-full px-3 py-0.5 text-xs font-semibold">
                  First 100 founders
                </span>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              {isFreeProPlan ? (
                <>
                  <span className="text-foreground text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground text-sm line-through">
                    {tPlans('proPlan.price')}
                  </span>
                </>
              ) : (
                <span className="text-foreground text-5xl font-bold">
                  {tPlans('proPlan.price')}
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              {isFreeProPlan
                ? tPlans('proPlan.description')
                : tPlans('proPlan.descriptionPaid')}
            </p>

            {/* Scarcity counter + progress bar */}
            {isFreeProPlan && (
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {Math.min(spotsClaimed, totalSpots)} of {totalSpots} spots
                    claimed
                  </span>
                  <span className="text-muted-foreground">
                    {spotsLeft} left
                  </span>
                </div>
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}

            <ul className="mt-8 flex-1 space-y-3">
              {proFeatures.map((f, i) => (
                <li key={f} className="flex items-center gap-3">
                  <CheckIcon className="text-primary h-4 w-4 shrink-0" />
                  <span
                    className={cn(
                      'text-sm',
                      i === 0
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground',
                    )}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <PricingCTAButton
              plan="pro"
              label={
                isFreeProPlan ? 'Reserve your free spot →' : 'Get Pro ($149) →'
              }
              highlighted={true}
            />

            <p className="text-muted-foreground mt-4 text-center text-xs">
              {isFreeProPlan
                ? 'After 100 spots, $149 one-time. Lifetime updates. 14-day refund.'
                : 'One-time payment. Lifetime updates. 14-day refund.'}
            </p>
          </div>
        </div>

        <p className="mt-8 text-center">
          <a
            href="#faq"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Questions about licensing? →
          </a>
        </p>
      </Container>
    </section>
  );
}
