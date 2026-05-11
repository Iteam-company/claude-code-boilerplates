import { userService, resetPasswordSchema } from '@/modules/user';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await userService.resetPassword(parsed.data.token, parsed.data.password);

    return Response.json({ message: 'Password updated successfully' });
  } catch (error: unknown) {
    return handleError(error);
  }
}
