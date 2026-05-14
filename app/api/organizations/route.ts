import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import {
  organizationService,
  createOrganizationSchema,
} from '@/modules/organization';

export async function GET(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const orgs = await organizationService.listForUser(userId);
    return Response.json(orgs);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const body = await req.json();
    const parsed = createOrganizationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const org = await organizationService.create(parsed.data.name, userId);
    return Response.json(org, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
