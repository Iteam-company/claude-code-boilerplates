import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { PricingCTAButton } from './PricingCTAButton';
import { FadeIn } from './FadeIn';

const FREE_FEATURE_KEYS = [
  'stripeCheckout',
  'subscriptions',
  'webhooks',
  'customerPortal',
  'auth',
  'email',
  'fileUploads',
  'mdxBlog',
  'darkTheme',
] as const;

const PRO_FEATURE_KEYS = [
  'skills',
  'agents',
  'mcp',
  'multiTenancy',
  'ai',
  'premiumSkills',
  'updates',
  'discord',
] as const;

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="border-border bg-background text-muted-foreground rounded-md border px-2.5 py-1 text-xs font-medium">
      {label}
    </span>
  );
}

export async function Offer() {
  const t = await getTranslations('landing.offer');
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <h2 className="text-foreground mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight md:text-5xl">
            {t('heading')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Free card */}
            <div className="border-border bg-muted/30 flex flex-col rounded-2xl border p-8">
              <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">
                {t('freeBadge')}
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                {t('freeDesc1')}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {t('freeDesc2')}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {FREE_FEATURE_KEYS.map((k) => (
                  <FeatureChip key={k} label={t(`freeFeatures.${k}`)} />
                ))}
              </div>
              <PricingCTAButton
                plan="free"
                label={t('freeCta')}
                highlighted={false}
              />
            </div>

            {/* Pro card */}
            <div className="border-primary/20 bg-primary/5 flex flex-col rounded-2xl border p-8">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                {t('proBadge')}
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                {t('proDesc')}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {PRO_FEATURE_KEYS.map((k) => (
                  <FeatureChip key={k} label={t(`proFeatures.${k}`)} />
                ))}
              </div>
              <PricingCTAButton plan="pro" label={t('proCta')} highlighted />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
