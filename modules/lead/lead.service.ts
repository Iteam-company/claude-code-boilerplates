import React from 'react';
import { leadRepo } from './lead.repo';
import { CreateLeadInput } from './lead.types';
import { HttpError } from '@/lib/errors/http-error';
import { emailService, APP_NAME } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';
import { OnboardingEmail } from '@/emails/onboarding-email';

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
};
