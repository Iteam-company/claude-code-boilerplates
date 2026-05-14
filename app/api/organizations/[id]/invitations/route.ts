import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import { invitationService, sendInvitationSchema } from '@/modules/invitation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id } = await params;
    const invitations = await invitationService.listPending(id, userId);
    return Response.json(invitations);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function POST(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id } = await params;
    const body = await req.json();
    const parsed = sendInvitationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    await invitationService.send(
      id,
      parsed.data.email,
      parsed.data.role,
      userId,
    );
    return Response.json({ message: 'Invitation sent' }, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
