import { postService, updatePostSchema } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth';

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const post = await postService.getBySlug(slug);
    return Response.json(post);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    getUserFromRequest(req);

    const { slug } = await params;
    const body = await req.json();

    const parsed = updatePostSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const existing = await postService.getBySlug(slug);
    const post = await postService.update(existing.id, parsed.data);

    return Response.json(post);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    getUserFromRequest(_req);

    const { slug } = await params;
    const existing = await postService.getBySlug(slug);
    await postService.delete(existing.id);
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
