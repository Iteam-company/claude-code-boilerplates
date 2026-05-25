import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpError } from './errors';

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'auth_token';
const SESSION_COOKIE = 'auth_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getTokenFromCookie(req: Request): string | null {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const match = cookieHeader.match(/(?:^|;\s*)auth_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function verifyToken(token: string): { id: string } {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return { id: payload.userId as string };
  } catch {
    throw new HttpError(401, 'Invalid token');
  }
}

export function buildAuthCookies(token: string): string[] {
  const isProduction = process.env.NODE_ENV === 'production';
  const base = `Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${isProduction ? '; Secure' : ''}`;
  return [
    `${COOKIE_NAME}=${token}; HttpOnly; ${base}`,
    `${SESSION_COOKIE}=1; ${base}`,
  ];
}

export function clearAuthCookies(): string[] {
  return [
    `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
    `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`,
  ];
}

export function getUserFromRequest(req: Request) {
  const token = getTokenFromCookie(req);
  if (!token) throw new HttpError(401, 'Unauthorized');
  return verifyToken(token);
}

export function getCallerFromRequest(req: Request) {
  const cookieToken = getTokenFromCookie(req);
  if (cookieToken) return verifyToken(cookieToken);

  const authorization = req.headers.get('Authorization');
  if (authorization?.startsWith('Bearer '))
    return verifyToken(authorization.slice(7));

  const apiKey = req.headers.get('X-Api-Key');
  if (apiKey && apiKey === process.env.AI_API_KEY && process.env.AI_AUTHOR_ID)
    return { id: process.env.AI_AUTHOR_ID };

  throw new HttpError(401, 'Unauthorized');
}
