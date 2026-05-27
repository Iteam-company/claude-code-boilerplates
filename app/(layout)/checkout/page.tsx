import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingSection } from '@/components/checkout/PricingSection';
import { getBaseUrl } from '@/lib/utils';

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

export default async function CheckoutPage() {
  const base = getBaseUrl();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Claude Code Boilerplate Pro',
    url: `${base}/checkout`,
    description:
      'Production-ready Next.js SaaS starter with 40+ Claude Code skills, multi-tenancy, AI module, custom agents, and lifetime updates.',
    brand: {
      '@type': 'Brand',
      name: 'Claude Code Boilerplate',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${base}/checkout`,
        description:
          'Full boilerplate with auth, Stripe, email, and 10 skills.',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '149',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${base}/checkout`,
        description:
          '40+ skills, multi-tenancy, AI module, 11 custom agents, lifetime updates.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/<\//g, '<\\/'),
        }}
      />
      <PricingSection />
    </>
  );
}
