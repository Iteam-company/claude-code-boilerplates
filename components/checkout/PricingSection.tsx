import { getTranslations } from 'next-intl/server';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countProSpotsTaken, TOTAL_PRO_SPOTS } from '@/lib/spots';
import { CheckoutEmailButton } from './CheckoutEmailButton';

export async function PricingSection() {
  const tPlans = await getTranslations('pricing');
  const spotsClaimed = await countProSpotsTaken();
  const isFreeProPlan = spotsClaimed < TOTAL_PRO_SPOTS;
  const spotsLeft = Math.max(0, TOTAL_PRO_SPOTS - spotsClaimed);
  const pct = Math.min(100, Math.round((spotsClaimed / TOTAL_PRO_SPOTS) * 100));

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
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
            {isFreeProPlan
              ? 'Two plans. One free forever. One free for 100 people.'
              : 'Two plans. One free forever. One for serious builders.'}
          </h1>
        </div>

        <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Free card */}
          <div className="border-border bg-card flex flex-col rounded-xl border p-8">
            <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
              {tPlans('proLicense.name')}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-foreground text-5xl font-bold">
                {tPlans('proLicense.price')}
              </span>
              <span className="text-muted-foreground text-sm">
                {tPlans('proLicense.forever')}
              </span>
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

            <CheckoutEmailButton
              plan="free"
              label={tPlans('proLicense.landingCta')}
              className="border-border text-foreground hover:bg-muted mt-8 w-full rounded-md border px-6 py-2.5 text-center text-sm font-medium transition-colors"
            />

            <p className="text-muted-foreground mt-4 text-center text-xs">
              {tPlans('proLicense.finePrint')}
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
                  {tPlans('proPlan.badge')}
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
                    {tPlans('proPlan.spotsClaimed', {
                      claimed: Math.min(spotsClaimed, TOTAL_PRO_SPOTS),
                      total: TOTAL_PRO_SPOTS,
                    })}
                  </span>
                  <span className="text-muted-foreground">
                    {tPlans('proPlan.spotsLeft', { count: spotsLeft })}
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

            <CheckoutEmailButton
              plan="pro"
              label={
                isFreeProPlan
                  ? tPlans('proPlan.ctaFree')
                  : tPlans('proPlan.ctaPaid')
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 w-full rounded-md px-6 py-2.5 text-center text-sm font-medium transition-colors"
            />

            <p className="text-muted-foreground mt-4 text-center text-xs">
              {isFreeProPlan
                ? tPlans('proPlan.finePrintFree')
                : tPlans('proPlan.finePrintPaid')}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          {tPlans('page.refundNote')}
        </p>
        <p className="mt-4 text-center">
          <a
            href="/#faq"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Questions about licensing? →
          </a>
        </p>
      </div>
    </section>
  );
}
