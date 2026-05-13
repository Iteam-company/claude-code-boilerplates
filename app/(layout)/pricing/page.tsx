import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingSection } from '@/components/checkout/PricingSection';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pricing.page');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function PricingPage() {
  return (
    <>
      <PricingSection />
      <PricingFAQ />
    </>
  );
}
