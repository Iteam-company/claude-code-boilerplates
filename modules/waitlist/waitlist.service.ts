import { TOTAL_PRO_SPOTS } from '@/lib/spots';
import { waitlistRepo } from './waitlist.repo';

export const waitlistService = {
  async addEmail(
    email: string,
    plan: 'free' | 'pro',
  ): Promise<{
    alreadyExists: boolean;
    requiresPayment: boolean;
    hasGithub: boolean;
  }> {
    const existing = await waitlistRepo.findByEmail(email);

    if (existing) {
      if (existing.plan === 'pro') {
        // User is already counted in proCount, so use strict > for the threshold
        const proCount = await waitlistRepo.countPro();
        return {
          alreadyExists: true,
          requiresPayment: proCount > TOTAL_PRO_SPOTS,
          hasGithub: !!existing.githubUsername,
        };
      }
      return { alreadyExists: true, requiresPayment: false, hasGithub: false };
    }

    if (plan === 'pro') {
      const proCount = await waitlistRepo.countPro();
      const requiresPayment = proCount >= TOTAL_PRO_SPOTS;
      await waitlistRepo.insert({ email, plan });
      return { alreadyExists: false, requiresPayment, hasGithub: false };
    }

    await waitlistRepo.insert({ email, plan });
    return { alreadyExists: false, requiresPayment: false, hasGithub: false };
  },

  async addGithubUsername(
    email: string,
    githubUsername: string,
  ): Promise<{ requiresPayment: boolean }> {
    await waitlistRepo.updateGithub(email, githubUsername);
    // User is already in the DB (counted), so use strict > to not penalise the 100th free user
    const proCount = await waitlistRepo.countPro();
    return { requiresPayment: proCount > TOTAL_PRO_SPOTS };
  },
};
