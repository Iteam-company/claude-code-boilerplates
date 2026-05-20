import { handleError } from '@/lib/errors';
import { countProSpotsTaken, TOTAL_PRO_SPOTS } from '@/lib/spots';

export async function GET() {
  try {
    const taken = await countProSpotsTaken();
    const remaining = Math.max(0, TOTAL_PRO_SPOTS - taken);
    return Response.json({ taken, remaining, total: TOTAL_PRO_SPOTS });
  } catch (error: unknown) {
    return handleError(error);
  }
}
