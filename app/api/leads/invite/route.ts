import { leadService } from '@/modules/lead';
import { handleError } from '@/lib/errors';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await leadService.retryInvite(parsed.data.email);
    return Response.json({ ok: true, ...result });
  } catch (error: unknown) {
    return handleError(error);
  }
}
