export type User = {
  id: string;
  email: string;
  passwordHash: string;
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
