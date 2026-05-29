import { leadService } from '@/modules/lead';
import { handleError, HttpError } from '@/lib/errors';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

function assertSameOrigin(req: Request): void {
  const origin = req.headers.get('origin');
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  if (!origin || !base || !origin.startsWith(base)) {
    throw new HttpError(403, 'Forbidden');
  }
}

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
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
