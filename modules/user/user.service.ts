import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepo } from './user.repo';
import { AuthResponse, User } from './user.types';
import { HttpError } from '@/lib/errors/http-error';
import {
  emailService,
  ENABLE_WELCOME_EMAIL,
  ENABLE_EMAIL_VERIFICATION,
} from '@/lib/email';

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
    const user = await userRepo.create({ email, passwordHash });

    if (ENABLE_EMAIL_VERIFICATION) {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      await userRepo.setEmailVerificationToken(user.id, verificationToken);
      await emailService.sendVerificationEmail(email, verificationToken);
    }

    if (ENABLE_WELCOME_EMAIL) {
      await emailService.sendWelcomeEmail(email);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { user: sanitizeUser(user), token };
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

    if (ENABLE_EMAIL_VERIFICATION && !user.emailVerified) {
      throw new HttpError(403, 'Please verify your email before logging in');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { user: sanitizeUser(user), token };
  },

  forgotPassword: async (email: string): Promise<void> => {
    const user = await userRepo.findByEmail(email);

    // Always resolve without error to avoid leaking whether the email exists
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await userRepo.setPasswordResetToken(user.id, resetToken, expiresAt);
    await emailService.sendPasswordResetEmail(email, resetToken);
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    const user = await userRepo.findByPasswordResetToken(token);

    if (!user || !user.passwordResetTokenExpiresAt) {
      throw new HttpError(400, 'Invalid or expired reset token');
    }

    if (user.passwordResetTokenExpiresAt < new Date()) {
      throw new HttpError(400, 'Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await userRepo.updatePassword(user.id, passwordHash);
    await userRepo.clearPasswordResetToken(user.id);
  },

  verifyEmail: async (token: string): Promise<void> => {
    const user = await userRepo.findByEmailVerificationToken(token);

    if (!user) {
      throw new HttpError(400, 'Invalid verification token');
    }

    await userRepo.markEmailVerified(user.id);
  },
};
