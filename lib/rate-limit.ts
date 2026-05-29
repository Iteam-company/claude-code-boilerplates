import { HttpError } from './errors';

interface Entry {
  count: number;
  resetAt: number;
}

// In-memory store — works per function instance. For multi-instance deployments
// (Vercel Fluid Compute, multiple servers) replace with a Redis-backed counter.
const store = new Map<string, Entry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): void {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (entry.count >= limit) {
    throw new HttpError(429, 'Too many requests. Please try again later.');
  }

  entry.count += 1;
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}
