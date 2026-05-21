import { githubService } from '@/lib/github';
import { handleError } from '@/lib/errors';
import { z } from 'zod';

const schema = z.object({
  github_username: z.string().min(1).max(39),
});

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await githubService.inviteCollaborator(parsed.data.github_username);

    return Response.json({
      success: true,
      github_username: parsed.data.github_username,
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
