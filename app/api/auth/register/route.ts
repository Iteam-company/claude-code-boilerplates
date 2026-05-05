import { userService, registerSchema } from '@/modules/user';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { email, password, passwordRepeat } = parsed.data;

    if (password !== passwordRepeat) {
      return Response.json(
        { error: 'Passwords do not match' },
        { status: 400 },
      );
    }

    const result = await userService.register(email, password);

    return Response.json(result);
  } catch (error: unknown) {
    return handleError(error);
  }
}
