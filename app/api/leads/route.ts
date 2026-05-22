import { leadService } from '@/modules/lead';
import {
  addEmailSchema,
  addGithubSchema,
} from '@/modules/lead/lead.validation';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = addEmailSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await leadService.addEmail(
      parsed.data.email,
      parsed.data.tier,
    );
    return Response.json({ ok: true, ...result });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsed = addGithubSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await leadService.addGithubUsername(
      parsed.data.email,
      parsed.data.githubUsername,
    );
    return Response.json({ ok: true, ...result });
  } catch (error: unknown) {
    return handleError(error);
  }
}
