import { userService, registerSchema } from '@/modules/user';
import { handleError } from '@/lib/errors';
import { buildAuthCookies } from '@/lib/auth';

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

    const { user, token } = await userService.register(email, password);

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: [
        ['Content-Type', 'application/json'],
        ...buildAuthCookies(token).map(
          (c) => ['Set-Cookie', c] as [string, string],
        ),
      ],
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
