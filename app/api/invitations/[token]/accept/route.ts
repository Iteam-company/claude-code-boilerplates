import { handleError } from '@/lib/errors';
import {
  invitationService,
  acceptInvitationSchema,
} from '@/modules/invitation';

interface Props {
  params: Promise<{ token: string }>;
}

export async function POST(req: Request, { params }: Props) {
  try {
    const { token } = await params;
    const body = await req.json();
    const parsed = acceptInvitationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await invitationService.accept(token, parsed.data.password);
    return Response.json(result);
  } catch (error: unknown) {
    return handleError(error);
  }
}
