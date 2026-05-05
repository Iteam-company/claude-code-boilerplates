import { postService, createPostSchema } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const posts = await postService.getAll();
    return Response.json(posts);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = getUserFromRequest(req);

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
