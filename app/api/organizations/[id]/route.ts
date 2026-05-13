import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import {
  organizationService,
  updateOrganizationSchema,
} from '@/modules/organization';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id } = await params;
    const org = await organizationService.getById(id, userId);
    return Response.json(org);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id } = await params;
    const body = await req.json();
    const parsed = updateOrganizationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const org = await organizationService.update(id, userId, parsed.data);
    return Response.json(org);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id } = await params;
    await organizationService.delete(id, userId);
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
