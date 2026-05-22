import 'server-only';
import { leadRepo } from '@/modules/lead/lead.repo';

export const TOTAL_PRO_SPOTS = Number(process.env.TOTAL_PRO_SPOTS ?? '100');

export async function countProSpotsTaken(): Promise<number> {
  return leadRepo.countPro();
}
