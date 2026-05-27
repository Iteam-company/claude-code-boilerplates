import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { stripe } from '@/lib/stripe';
import { leadRepo } from '@/modules/lead/lead.repo';
import { leadService } from '@/modules/lead/lead.service';
import { RetryInviteButton } from '@/components/checkout/RetryInviteButton';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkoutSuccess');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: '/checkout/success',
      languages: { en: '/checkout/success', 'x-default': '/checkout/success' },
    },
  };
}

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const t = await getTranslations('checkoutSuccess');
  const { session_id } = await searchParams;

  let inviteEmail: string | null = null;
  let inviteSent = false;
  let isProSession = false;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      isProSession = session.metadata?.tier === 'pro';
      const email =
        session.customer_details?.email ?? session.customer_email ?? null;
      inviteEmail = email;

      if (isProSession && email) {
        const lead = await leadRepo.findByEmail(email);
        inviteSent = !!lead?.githubInvitedAt;

        if (!inviteSent) {
          await leadService.handleProCheckout(session);
          const updated = await leadRepo.findByEmail(email);
          inviteSent = !!updated?.githubInvitedAt;
        }
      }
    } catch {
      // Stripe retrieval failed — fall through to generic success
    }
  }

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
        {isProSession ? (
          <p className="text-muted-foreground mt-2">
            {inviteSent ? t('inviteSent') : t('invitePending')}
          </p>
        ) : (
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        )}
      </div>

      {isProSession && !inviteSent && inviteEmail && (
        <RetryInviteButton email={inviteEmail} />
      )}

      <Link
        href="/docs/getting-started"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2.5 text-sm font-medium"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
