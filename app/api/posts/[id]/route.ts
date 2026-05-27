import { postService, updatePostSchema } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getCallerFromRequest } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const post = await postService.getById(id);
    return Response.json(post);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: callerId } = getCallerFromRequest(req);

    const { id } = await params;
    const body = await req.json();

    const parsed = updatePostSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const post = await postService.update(id, parsed.data, callerId);
    return Response.json(post);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: callerId } = getCallerFromRequest(_req);

    const { id } = await params;
    await postService.delete(id, callerId);
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
