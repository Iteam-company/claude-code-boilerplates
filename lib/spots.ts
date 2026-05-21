import 'server-only';
import { waitlistRepo } from '@/modules/waitlist/waitlist.repo';

export const TOTAL_PRO_SPOTS = 100;

export async function countProSpotsTaken(): Promise<number> {
  return waitlistRepo.countPro();
}
