import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import { invitationService } from '@/modules/invitation';

interface Props {
  params: Promise<{ id: string; invitationId: string }>;
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id, invitationId } = await params;
    await invitationService.cancel(invitationId, id, userId);
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
