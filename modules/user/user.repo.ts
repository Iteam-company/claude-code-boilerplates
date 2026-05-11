import { db } from '@/db/drizzle';
import { userTable } from './user.schema';
import { eq } from 'drizzle-orm';
import { CreateUserInput } from './user.types';

export const userRepo = {
  create: async (data: CreateUserInput) => {
    const [user] = await db.insert(userTable).values(data).returning();
    return user;
  },

  findByEmail: async (email: string) => {
    return db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
  },

  findById: async (id: string) => {
    return db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });
  },

  findByPasswordResetToken: async (token: string) => {
    return db.query.userTable.findFirst({
      where: eq(userTable.passwordResetToken, token),
    });
  },

  findByEmailVerificationToken: async (token: string) => {
    return db.query.userTable.findFirst({
      where: eq(userTable.emailVerificationToken, token),
    });
  },

  setPasswordResetToken: async (
    userId: string,
    token: string,
    expiresAt: Date,
  ) => {
    await db
      .update(userTable)
      .set({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expiresAt,
      })
      .where(eq(userTable.id, userId));
  },

  clearPasswordResetToken: async (userId: string) => {
    await db
      .update(userTable)
      .set({ passwordResetToken: null, passwordResetTokenExpiresAt: null })
      .where(eq(userTable.id, userId));
  },

  updatePassword: async (userId: string, passwordHash: string) => {
    await db
      .update(userTable)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(userTable.id, userId));
  },

  setEmailVerificationToken: async (userId: string, token: string) => {
    await db
      .update(userTable)
      .set({ emailVerificationToken: token })
      .where(eq(userTable.id, userId));
  },

  markEmailVerified: async (userId: string) => {
    await db
      .update(userTable)
      .set({ emailVerified: true, emailVerificationToken: null })
      .where(eq(userTable.id, userId));
  },
};
