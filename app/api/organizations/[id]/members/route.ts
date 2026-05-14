import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import { orgMemberService } from '@/modules/orgMember';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id } = await params;
    const members = await orgMemberService.listMembers(id, userId);
    return Response.json(members);
  } catch (error: unknown) {
    return handleError(error);
  }
}
