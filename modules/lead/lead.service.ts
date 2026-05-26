import React from 'react';
import Stripe from 'stripe';
import { leadRepo } from './lead.repo';
import { AddEmailResult, AddGithubResult } from './lead.types';
import { emailService, APP_NAME } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';
import { githubService } from '@/lib/github';
import { OnboardingEmail } from '@/emails/onboarding-email';
import { ProOnboardingEmail } from '@/emails/pro-onboarding-email';
import { TOTAL_PRO_SPOTS } from '@/lib/spots';
import { getBaseUrl } from '@/lib/utils';

const GITHUB_REPO_URL =
  process.env.NEXT_PUBLIC_FREE_REPO_URL ??
  'https://github.com/your-org/your-repo';
const PRO_REPO_URL =
  process.env.NEXT_PUBLIC_PRO_REPO_URL ??
  'https://github.com/your-org/your-pro-repo';
const DOCS_URL = `${getBaseUrl()}/docs`;
const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL ?? 'https://discord.gg/your-server';
const DISCORD_PRO_URL = process.env.NEXT_PUBLIC_DISCORD_PRO_URL ?? DISCORD_URL;

async function sendProEmail(email: string, githubUsername: string) {
  await emailService.sendEmail({
    to: email,
    subject: `Your ${APP_NAME} Pro access is confirmed`,
    react: React.createElement(ProOnboardingEmail, {
      appName: APP_NAME,
      githubUsername,
      repoUrl: PRO_REPO_URL,
      docsUrl: DOCS_URL,
      discordUrl: DISCORD_PRO_URL,
    }),
  });
}

export const leadService = {
  addEmail: async (
    email: string,
    tier: 'free' | 'pro',
  ): Promise<AddEmailResult> => {
    const existing = await leadRepo.findByEmail(email);

    if (existing) {
      if (tier === 'pro') {
        // If already invited, show "you're in" duplicate screen, don't re-charge
        if (existing.githubInvitedAt) {
          return {
            alreadyExists: true,
            requiresPayment: false,
            hasGithub: true,
            isPro: true,
          };
        }
        const proCount = await leadRepo.countPro();
        return {
          alreadyExists: true,
          requiresPayment: proCount > TOTAL_PRO_SPOTS,
          hasGithub: !!existing.githubUsername,
          githubUsername: existing.githubUsername ?? undefined,
          isPro: existing.tierInterest === 'pro',
        };
      }
      return { alreadyExists: true, requiresPayment: false, hasGithub: false };
    }

    if (tier === 'free') {
      await leadRepo.insert(email, 'free');
      trackEvent('free_signup_created', { email });
      await emailService.sendEmail({
        to: email,
        subject: `Your free ${APP_NAME} access`,
        react: React.createElement(OnboardingEmail, {
          appName: APP_NAME,
          githubUrl: GITHUB_REPO_URL,
          docsUrl: DOCS_URL,
          discordUrl: DISCORD_URL,
        }),
      });
      return { alreadyExists: false, requiresPayment: false, hasGithub: false };
    }

    // pro — check spots before inserting (new user not yet counted)
    const proCount = await leadRepo.countPro();
    const requiresPayment = proCount >= TOTAL_PRO_SPOTS;
    await leadRepo.insert(email, 'pro');
    return { alreadyExists: false, requiresPayment, hasGithub: false };
  },

  addGithubUsername: async (
    email: string,
    githubUsername: string,
  ): Promise<AddGithubResult> => {
    await leadRepo.updateGithub(email, githubUsername);
    // User is already inserted (counted), use strict > so 100th user is free
    const proCount = await leadRepo.countPro();
    const requiresPayment = proCount > TOTAL_PRO_SPOTS;

    if (requiresPayment) return { requiresPayment, inviteSent: false };

    const lead = await leadRepo.findByEmail(email);
    if (!lead || lead.githubInvitedAt)
      return { requiresPayment, inviteSent: true };

    try {
      await githubService.inviteCollaborator(githubUsername);
      await leadRepo.markGithubInvited(lead.id);
      trackEvent('pro_repo_invited', { githubUsername });
      await sendProEmail(email, githubUsername);
      return { requiresPayment, inviteSent: true };
    } catch (err) {
      console.error(
        'GitHub invite failed, will surface to client for retry',
        err,
      );
      return { requiresPayment, inviteSent: false };
    }
  },

  retryInvite: async (email: string): Promise<{ inviteSent: boolean }> => {
    const lead = await leadRepo.findByEmail(email);
    if (!lead?.githubUsername) return { inviteSent: false };
    if (lead.githubInvitedAt) return { inviteSent: true };

    try {
      await githubService.inviteCollaborator(lead.githubUsername);
      await leadRepo.markGithubInvited(lead.id);
      trackEvent('pro_repo_invited', { githubUsername: lead.githubUsername });
      await sendProEmail(email, lead.githubUsername);
      return { inviteSent: true };
    } catch (err) {
      console.error('GitHub invite retry failed', err);
      return { inviteSent: false };
    }
  },

  handleProCheckout: async (session: Stripe.Checkout.Session) => {
    const email =
      session.customer_details?.email ?? session.customer_email ?? null;
    const githubUsername = session.metadata?.github_username;

    if (!email || !githubUsername) {
      console.error(
        'pro checkout.session.completed missing email or github_username',
        { sessionId: session.id },
      );
      return;
    }

    const lead = await leadRepo.upsertPro({ email, githubUsername });
    await leadRepo.updateStripeSession(lead.id, session.id);
    trackEvent('pro_checkout_completed', { githubUsername });

    if (lead.githubInvitedAt) return;

    try {
      await githubService.inviteCollaborator(githubUsername);
      await leadRepo.markGithubInvited(lead.id);
      trackEvent('pro_repo_invited', { githubUsername });
      await sendProEmail(email, githubUsername);
    } catch (err) {
      console.error('GitHub invite failed after checkout', err);
    }
  },
};
