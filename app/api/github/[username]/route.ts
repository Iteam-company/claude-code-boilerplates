import { NextResponse } from 'next/server';

function assertSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  return !origin || !base || origin.startsWith(base);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  if (!assertSameOrigin(_req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { username } = await params;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    { headers, next: { revalidate: 60 } },
  );

  if (res.status === 404) {
    return NextResponse.json({ exists: false }, { status: 404 });
  }
  if (!res.ok) {
    return NextResponse.json({ error: 'GitHub API error.' }, { status: 502 });
  }
  return NextResponse.json({ exists: true });
}
