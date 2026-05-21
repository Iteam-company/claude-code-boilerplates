import { leadService, createLeadSchema } from '@/modules/lead';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = createLeadSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await leadService.create({
      email: parsed.data.email,
      tierInterest: parsed.data.tierInterest,
      signupSource: parsed.data.signupSource ?? null,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
