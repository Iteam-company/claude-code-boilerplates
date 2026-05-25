import { clearAuthCookies } from '@/lib/auth';

export async function POST() {
  return new Response(null, {
    status: 204,
    headers: clearAuthCookies().map(
      (c) => ['Set-Cookie', c] as [string, string],
    ),
  });
}
