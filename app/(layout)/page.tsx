import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hero, Steps, Features, Pricing, FAQ, CTA } from '@/components/landing';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('landing.meta');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
