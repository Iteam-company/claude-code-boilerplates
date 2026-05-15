import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpError } from './errors';

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserFromRequest(req: Request) {
  const authorization = req.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer '))
    throw new HttpError(401, 'Unauthorized');
  const token = authorization.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return { id: payload.userId as string };
  } catch {
    throw new HttpError(401, 'Invalid token');
  }
}

export function getCallerFromRequest(req: Request) {
  const authorization = req.headers.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    const token = authorization.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
      return { id: payload.userId as string };
    } catch {
      throw new HttpError(401, 'Invalid token');
    }
  }

  const apiKey = req.headers.get('X-Api-Key');
  if (apiKey && apiKey === process.env.AI_API_KEY && process.env.AI_AUTHOR_ID) {
    return { id: process.env.AI_AUTHOR_ID };
  }

  throw new HttpError(401, 'Unauthorized');
}
