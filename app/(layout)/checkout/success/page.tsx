import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkoutSuccess');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function CheckoutSuccessPage() {
  const t = await getTranslations('checkoutSuccess');

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
        <svg
          className="text-primary h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div>
        <h1 className="text-foreground text-2xl font-bold">{t('heading')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </div>

      <Link
        href="/docs/getting-started"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2.5 text-sm font-medium"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
