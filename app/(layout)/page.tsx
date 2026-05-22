import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Hero,
  Problem,
  Offer,
  Comparison,
  Features,
  SkillsShowcase,
  HowItWorks,
  Demo,
  Pricing,
  FAQ,
  SocialProof,
  Testimonials,
  FinalCTA,
} from '@/components/landing';
import { getBaseUrl } from '@/lib/utils';
import { countProSpotsTaken, TOTAL_PRO_SPOTS } from '@/lib/spots';
import { leadRepo } from '@/modules/lead/lead.repo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('landing.meta');
  return {
    title: { absolute: t('title') },
    description: t('description'),
  };
}

async function getLandingData() {
  const [githubRes, taken, subscribers] = await Promise.allSettled([
    fetch(
      'https://api.github.com/repos/Iteam-company/claude-code-boilerplates',
      {
        next: { revalidate: 3600 },
      },
    ).then((r) => r.json()),
    countProSpotsTaken(),
    leadRepo.countAll(),
  ]);

  const stars =
    githubRes.status === 'fulfilled' &&
    typeof githubRes.value?.stargazers_count === 'number'
      ? (githubRes.value.stargazers_count as number)
      : null;

  const takenCount = taken.status === 'fulfilled' ? taken.value : 0;
  const subscriberCount =
    subscribers.status === 'fulfilled' ? subscribers.value : 0;

  return {
    stars,
    spots: {
      remaining: Math.max(0, TOTAL_PRO_SPOTS - takenCount),
      total: TOTAL_PRO_SPOTS,
    },
    subscribers: subscriberCount,
  };
}

export default async function Home() {
  const base = getBaseUrl();
  const { stars, spots, subscribers } = await getLandingData();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Claude Code Boilerplate',
    url: base,
    description:
      'Open-source Next.js SaaS starter with Stripe, auth, and Claude Code built in. Free forever.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Claude Code Boilerplate',
    url: base,
    description:
      'Production-ready Next.js SaaS starter pre-wired for Claude Code — auth, Stripe payments, email, multi-tenancy, and AI built in.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'USD',
        description:
          'Full boilerplate with auth, Stripe, email, blog, and 10 Claude Code skills.',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '149',
        priceCurrency: 'USD',
        description:
          '40+ skills, multi-tenancy, AI module, 11 custom agents, lifetime updates.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Hero stars={stars} spots={spots} />
      <SocialProof stars={stars} subscribers={subscribers} />
      <Problem />
      <Offer />
      {/* <Demo /> */}
      <Features />
      <Comparison />
      <SkillsShowcase />
      <HowItWorks />
      {/* <Testimonials /> */}
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
