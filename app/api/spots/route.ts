import { handleError } from '@/lib/errors';
import { countProSpotsTaken, TOTAL_PRO_SPOTS } from '@/lib/spots';
import { waitlistRepo } from '@/modules/waitlist/waitlist.repo';

export async function GET() {
  try {
    const [taken, subscribers] = await Promise.all([
      countProSpotsTaken(),
      waitlistRepo.countAll(),
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
