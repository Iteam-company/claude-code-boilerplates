import { db } from '@/db/drizzle';
import { postTable } from './post.schema';
import { eq, and, sql } from 'drizzle-orm';
import { CreatePostInput, UpdatePostInput } from './post.types';

type FindAllFilter = { authorId?: string; published?: boolean };

export const postRepo = {
  create: async (data: CreatePostInput) => {
    const [post] = await db.insert(postTable).values(data).returning();
    return post;
  },

  findAll: async (filter?: FindAllFilter) => {
    const conditions = [];
    if (filter?.published !== undefined)
      conditions.push(eq(postTable.published, filter.published));
    if (filter?.authorId !== undefined)
      conditions.push(eq(postTable.authorId, filter.authorId));
    return db.query.postTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      columns: { content: false },
      orderBy: (post, { desc }) => [desc(post.createdAt)],
    });
  },

  findPaginated: async (
    filter: FindAllFilter | undefined,
    page: number,
    limit: number,
  ) => {
    const offset = (page - 1) * limit;
    const conditions = [];
    if (filter?.published !== undefined)
      conditions.push(eq(postTable.published, filter.published));
    if (filter?.authorId !== undefined)
      conditions.push(eq(postTable.authorId, filter.authorId));
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [posts, countResult] = await Promise.all([
      db.query.postTable.findMany({
        where: whereClause,
        columns: { content: false },
        orderBy: (post, { desc }) => [desc(post.createdAt)],
        limit,
        offset,
      }),
      db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(postTable)
        .where(whereClause),
    ]);

    return { posts, total: countResult[0].count };
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
