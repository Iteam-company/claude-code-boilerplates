import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import { creditService } from '@/modules/credit/credit.service';

export async function GET(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const [balance, history] = await Promise.all([
      creditService.getBalance(userId),
      creditService.getHistory(userId),
    ]);
    return Response.json({ balance, history });
  } catch (error: unknown) {
    return handleError(error);
  }
}
