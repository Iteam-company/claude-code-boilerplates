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
