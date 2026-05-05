import { db } from '@/db/drizzle';
import { postTable } from './post.schema';
import { eq } from 'drizzle-orm';
import { CreatePostInput, UpdatePostInput } from './post.types';

export const postRepo = {
  create: async (data: CreatePostInput) => {
    const [post] = await db.insert(postTable).values(data).returning();
    return post;
  },

  findAll: async () => {
    return db.query.postTable.findMany({
      where: eq(postTable.published, true),
      columns: { content: false },
      orderBy: (post, { desc }) => [desc(post.createdAt)],
    });
  },

  findBySlug: async (slug: string) => {
    return db.query.postTable.findFirst({
      where: eq(postTable.slug, slug),
    });
  },

  findById: async (id: string) => {
    return db.query.postTable.findFirst({
      where: eq(postTable.id, id),
    });
  },

  update: async (id: string, data: UpdatePostInput) => {
    const [post] = await db
      .update(postTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(postTable.id, id))
      .returning();
    return post;
  },

  delete: async (id: string) => {
    await db.delete(postTable).where(eq(postTable.id, id));
  },
};
