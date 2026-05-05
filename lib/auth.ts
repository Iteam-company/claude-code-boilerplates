import jwt from 'jsonwebtoken';
import { HttpError } from '@/lib/errors/http-error';

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserFromRequest = (req: Request): { userId: string } => {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HttpError(401, 'Missing or invalid Authorization header');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    return payload;
  } catch {
    throw new HttpError(401, 'Invalid or expired token');
  }
};
