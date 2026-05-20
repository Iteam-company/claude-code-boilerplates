import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
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
