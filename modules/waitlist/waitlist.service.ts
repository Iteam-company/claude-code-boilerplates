import { waitlistRepo } from './waitlist.repo';

const FREE_PRO_SLOTS = 100;

export const waitlistService = {
  async addEmail(email: string, plan: 'free' | 'pro') {
    await waitlistRepo.insert({ email, plan });
  },

  async addGithubUsername(
    email: string,
    githubUsername: string,
  ): Promise<{ requiresPayment: boolean }> {
    await waitlistRepo.updateGithub(email, githubUsername);
    const proCount = await waitlistRepo.countPro();
    return { requiresPayment: proCount > FREE_PRO_SLOTS };
  },
};
