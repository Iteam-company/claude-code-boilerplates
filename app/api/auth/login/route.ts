import { userService, loginSchema } from '@/modules/user';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const result = await userService.login(email, password);

    return Response.json(result);
  } catch (error: unknown) {
    return handleError(error);
  }
}
