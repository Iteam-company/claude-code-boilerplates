import React from 'react';
import Stripe from 'stripe';
import { leadRepo } from './lead.repo';
import { CreateLeadInput } from './lead.types';
import { HttpError } from '@/lib/errors/http-error';
import { emailService, APP_NAME } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';
import { githubService } from '@/lib/github';
import { OnboardingEmail } from '@/emails/onboarding-email';
import { ProOnboardingEmail } from '@/emails/pro-onboarding-email';

const GITHUB_REPO_URL =
  process.env.GITHUB_REPO_URL ?? 'https://github.com/your-org/your-repo';
const DOCS_URL = process.env.DOCS_URL ?? 'https://docs.example.com';
const DISCORD_URL = process.env.DISCORD_URL ?? 'https://discord.gg/your-server';

export const leadService = {
  create: async (input: CreateLeadInput) => {
    const existing = await leadRepo.findByEmail(input.email);
    if (existing) {
      throw new HttpError(409, 'Email already registered');
    }

    const lead = await leadRepo.create(input);

    if (input.tierInterest === 'free') {
      await emailService.sendEmail({
        to: input.email,
        subject: `Your free ${APP_NAME} access`,
        react: React.createElement(OnboardingEmail, {
          appName: APP_NAME,
          githubUrl: GITHUB_REPO_URL,
          docsUrl: DOCS_URL,
          discordUrl: DISCORD_URL,
        }),
      });
    }

    trackEvent('lead_created', {
      tierInterest: input.tierInterest,
      signupSource: input.signupSource ?? null,
    });

    return lead;
  },

  handleProCheckout: async (session: Stripe.Checkout.Session) => {
    const email = session.customer_details?.email;
    const githubUsername = session.metadata?.github_username;

    if (!email || !githubUsername) {
      console.error(
        'pro checkout.session.completed missing email or github_username',
        { sessionId: session.id },
      );
      return;
    }

    // Upsert is idempotent — safe if Stripe retries the webhook
    const lead = await leadRepo.upsertPro({ email, githubUsername });

    trackEvent('pro_checkout_completed', { githubUsername });

    // Skip invite + email if already processed (webhook retry guard)
    if (lead.githubInvitedAt) return;

    await githubService.inviteCollaborator(githubUsername);
    await leadRepo.markGithubInvited(lead.id);

    trackEvent('pro_repo_invited', { githubUsername });

    await emailService.sendEmail({
      to: email,
      subject: `Your ${APP_NAME} Pro access is confirmed`,
      react: React.createElement(ProOnboardingEmail, {
        appName: APP_NAME,
        githubUsername,
        docsUrl: DOCS_URL,
        discordUrl: DISCORD_URL,
      }),
    });
  },
};
