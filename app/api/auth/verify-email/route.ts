import { userService, verifyEmailSchema } from '@/modules/user';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = verifyEmailSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await userService.verifyEmail(parsed.data.token);

    return Response.json({ message: 'Email verified successfully' });
  } catch (error: unknown) {
    return handleError(error);
  }
}
