import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Hero,
  Problem,
  Offer,
  Comparison,
  Features,
  Demo,
  Pricing,
  FAQ,
  SocialProof,
} from '@/components/landing';
import { getBaseUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('landing.meta');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Home() {
  const base = getBaseUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Claude Code Boilerplate',
    url: base,
    description:
      'Production-ready Next.js starter pre-wired for Claude Code — auth, payments, blog, email, and AI chat built in.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <SocialProof />
      <Problem />
      <Offer />
      <Features />
      <Demo />
      <Comparison />
      <Pricing />
      <FAQ />
    </>
  );
}
