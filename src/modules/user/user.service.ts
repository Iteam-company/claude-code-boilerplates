import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepo } from './user.repo';
import { AuthResponse, User } from './user.types';
import { HttpError } from '@lib/errors/http-error';

const JWT_SECRET = process.env.JWT_SECRET!;

const sanitizeUser = (user: User) => {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
};

export const userService = {
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const existing = await userRepo.findByEmail(email);

    if (existing) {
      throw new HttpError(409, 'User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepo.create({
      email,
      passwordHash,
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return {
      user: sanitizeUser(user),
      token,
    };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new HttpError(401, 'Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new HttpError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return {
      user: sanitizeUser(user),
      token,
    };
  },
};
