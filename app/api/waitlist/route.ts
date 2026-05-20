import { NextResponse } from 'next/server';
import { waitlistService } from '@/modules/waitlist';
import {
  addEmailSchema,
  addGithubSchema,
} from '@/modules/waitlist/waitlist.validation';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = addEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }
    await waitlistService.addEmail(parsed.data.email, parsed.data.plan);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = addGithubSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }
    const result = await waitlistService.addGithubUsername(
      parsed.data.email,
      parsed.data.githubUsername,
    );
    return NextResponse.json({
      ok: true,
      requiresPayment: result.requiresPayment,
    });
  } catch (e) {
    console.error('[waitlist PATCH]', e);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
