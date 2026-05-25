import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingSection } from '@/components/checkout/PricingSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkout');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: '/checkout',
      languages: { en: '/checkout', 'x-default': '/checkout' },
    },
  };
}

export default function CheckoutPage() {
  return <PricingSection />;
}
