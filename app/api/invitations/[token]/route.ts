import { handleError } from '@/lib/errors';
import { invitationService } from '@/modules/invitation';

interface Props {
  params: Promise<{ token: string }>;
}

export async function GET(_req: Request, { params }: Props) {
  try {
    const { token } = await params;
    const details = await invitationService.getDetails(token);
    return Response.json(details);
  } catch (error: unknown) {
    return handleError(error);
  }
}
