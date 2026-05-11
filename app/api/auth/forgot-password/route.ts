import { userService, forgotPasswordSchema } from '@/modules/user';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await userService.forgotPassword(parsed.data.email);

    return Response.json({
      message: 'If that email exists, a reset link has been sent',
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
