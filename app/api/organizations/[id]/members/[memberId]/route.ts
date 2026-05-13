import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';
import { orgMemberService, updateMemberRoleSchema } from '@/modules/orgMember';

interface Props {
  params: Promise<{ id: string; memberId: string }>;
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id, memberId } = await params;
    const body = await req.json();
    const parsed = updateMemberRoleSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const member = await orgMemberService.updateRole(
      id,
      memberId,
      parsed.data.role,
      userId,
    );
    return Response.json(member);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id: userId } = getUserFromRequest(req);
    const { id, memberId } = await params;
    await orgMemberService.removeMember(id, memberId, userId);
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
