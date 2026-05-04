import { db } from '@db/drizzle';
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
};
