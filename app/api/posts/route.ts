import { postService, createPostSchema } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getUserFromRequest, getCallerFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const self = searchParams.get('self') === 'true';

    let authorId: string | undefined;
    if (self) {
      const user = getUserFromRequest(req);
      authorId = user.id;
    }

    const posts = await postService.getAll({
      authorId,
      published: self ? undefined : true,
    });

    return Response.json(posts);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { id: userId } = getCallerFromRequest(req);

    const body = await req.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const post = await postService.create({ ...parsed.data, authorId: userId });

    return Response.json(post, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
