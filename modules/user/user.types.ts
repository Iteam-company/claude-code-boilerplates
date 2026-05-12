export type User = {
  id: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  emailVerificationToken: string | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  email: string;
  passwordHash: string;
};

export type AuthResponse = {
  user: Omit<User, 'passwordHash'>;
  token: string;
};
