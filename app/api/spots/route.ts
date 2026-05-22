import { handleError } from '@/lib/errors';
import { countProSpotsTaken, TOTAL_PRO_SPOTS } from '@/lib/spots';
import { leadRepo } from '@/modules/lead/lead.repo';

export async function GET() {
  try {
    const [taken, subscribers] = await Promise.all([
      countProSpotsTaken(),
      leadRepo.countAll(),
    ]);
    const remaining = Math.max(0, TOTAL_PRO_SPOTS - taken);
    return Response.json({
      taken,
      remaining,
      total: TOTAL_PRO_SPOTS,
      subscribers,
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
