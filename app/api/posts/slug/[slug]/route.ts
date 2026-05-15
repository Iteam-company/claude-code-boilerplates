import { postService } from '@/modules/post';
import { handleError } from '@/lib/errors';

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
