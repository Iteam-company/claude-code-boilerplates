import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Comparison } from '@/components/landing';
import { PricingCTAButton } from '@/components/landing/PricingCTAButton';
import { getBaseUrl } from '@/lib/utils';
import { countProSpotsTaken, TOTAL_PRO_SPOTS } from '@/lib/spots';

interface CompetitorData {
  name: string;
  price: string;
  headline: string;
  subheading: string;
  metaTitle: string;
  metaDescription: string;
}

const COMPETITORS: Record<string, CompetitorData> = {
  shipfast: {
    name: 'ShipFast',
    price: '$199',
    headline: 'ShipFast is $199. This is free.',
    subheading:
      'Same core stack -- auth, Stripe, email, blog. Plus Claude Code skills, an AI module, and multi-tenancy that ShipFast does not include. Free forever, Pro from $149.',
    metaTitle: 'ShipFast Alternative -- Free Next.js SaaS Boilerplate',
    metaDescription:
      'Compare this free Next.js boilerplate vs ShipFast ($199). Same auth, Stripe, and email stack -- plus Claude Code skills and AI built in. Free forever, Pro from $149.',
  },
  makerkit: {
    name: 'MakerKit',
    price: '$199+',
    headline: 'MakerKit charges per project. This does not.',
    subheading:
      'MakerKit is a subscription product. This boilerplate is a one-time clone -- free forever. You get auth, Stripe, multi-tenancy, and Claude Code skills with no recurring fees.',
    metaTitle:
      'MakerKit Alternative -- Free Next.js SaaS Boilerplate with Claude Code',
    metaDescription:
      'Compare this free Next.js boilerplate vs MakerKit. One-time clone, no subscription. Auth, Stripe, multi-tenancy, and 40+ Claude Code skills. Free forever, Pro from $149.',
  },
  supastarter: {
    name: 'supastarter',
    price: '$261',
    headline: 'supastarter is $261. This is free.',
    subheading:
      'supastarter covers multi-tenancy and i18n -- so does this, plus Claude Code skills, custom agents, and an AI module you will not find anywhere else. Free forever, Pro from $149.',
    metaTitle: 'supastarter Alternative -- Free Next.js SaaS Boilerplate',
    metaDescription:
      'Compare this free Next.js boilerplate vs supastarter ($261). Auth, Stripe, multi-tenancy, i18n -- plus Claude Code skills and AI. Free forever, Pro from $149.',
  },
};

const OTHERS: Record<string, { label: string; href: string }[]> = {
  shipfast: [
    { label: 'vs MakerKit', href: '/vs/makerkit' },
    { label: 'vs supastarter', href: '/vs/supastarter' },
  ],
  makerkit: [
    { label: 'vs ShipFast', href: '/vs/shipfast' },
    { label: 'vs supastarter', href: '/vs/supastarter' },
  ],
  supastarter: [
    { label: 'vs ShipFast', href: '/vs/shipfast' },
    { label: 'vs MakerKit', href: '/vs/makerkit' },
  ],
};

export function generateStaticParams() {
  return Object.keys(COMPETITORS).map((competitor) => ({ competitor }));
}

function truncate(str: string, max: number) {
  return str.length <= max ? str : str.slice(0, max - 3).trimEnd() + '...';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const data = COMPETITORS[competitor];
  if (!data) return {};
  const title = truncate(data.metaTitle, 60);
  const description = truncate(data.metaDescription, 160);
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/vs/${competitor}`,
      languages: { en: `/vs/${competitor}`, 'x-default': `/vs/${competitor}` },
    },
    openGraph: {
      title,
      description,
      url: `/vs/${competitor}`,
      type: 'website',
      siteName: 'Claude Code Boilerplate',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function VsPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor } = await params;
  const data = COMPETITORS[competitor];
  if (!data) notFound();

  const taken = await countProSpotsTaken();
  const isFreeProPlan = taken < TOTAL_PRO_SPOTS;

  const base = getBaseUrl();
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      {
        '@type': 'ListItem',
        position: 2,
        name: `vs ${data.name}`,
        item: `${base}/vs/${competitor}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/<\//g, '<\\/'),
        }}
      />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground mb-4 text-sm font-medium tracking-widest uppercase">
              {data.name} vs Claude Code Boilerplate
            </p>
            <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              {data.headline}
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {data.subheading}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <PricingCTAButton
                plan="free"
                label="Clone for free"
                highlighted
              />
              <PricingCTAButton plan="pro" label="Get Pro — $149 one-time" />
            </div>
          </div>
        </Container>
      </section>

      <Comparison isFreeProPlan={isFreeProPlan} />

      <section className="py-12">
        <Container>
          <p className="text-muted-foreground text-center text-sm">
            See also:{' '}
            {OTHERS[competitor].map((link, i) => (
              <span key={link.href}>
                {i > 0 && ' · '}
                <Link
                  href={link.href}
                  className="hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </Container>
      </section>
    </>
  );
}
