import { db } from '@/db/drizzle';
import { postTable } from './post.schema';
import { eq, and, sql, arrayContains } from 'drizzle-orm';
import { CreatePostInput, PostFilter, UpdatePostInput } from './post.types';

function buildConditions(filter?: PostFilter) {
  const conditions = [];
  if (filter?.published !== undefined)
    conditions.push(eq(postTable.published, filter.published));
  if (filter?.authorId !== undefined)
    conditions.push(eq(postTable.authorId, filter.authorId));
  if (filter?.tag) conditions.push(arrayContains(postTable.tags, [filter.tag]));
  if (filter?.query?.trim()) {
    const tsquery = filter.query
      .trim()
      .split(/\s+/)
      .map((w) => w.replace(/[^a-z0-9]/gi, ''))
      .filter(Boolean)
      .map((w) => `${w}:*`)
      .join(' & ');
    if (tsquery) {
      conditions.push(
        sql`to_tsvector('english', ${postTable.title} || ' ' || ${postTable.description}) @@ to_tsquery('english', ${tsquery})`,
      );
    }
  }
  return conditions;
}

export const postRepo = {
  create: async (data: CreatePostInput) => {
    const [post] = await db.insert(postTable).values(data).returning();
    return post;
  },

  findAll: async (filter?: PostFilter) => {
    const conditions = buildConditions(filter);
    return db.query.postTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      columns: { content: false },
      orderBy: (post, { desc }) => [
        desc(post.publishedAt),
        desc(post.createdAt),
      ],
    });
  },

  findPaginated: async (
    filter: PostFilter | undefined,
    page: number,
    limit: number,
  ) => {
    const offset = (page - 1) * limit;
    const conditions = buildConditions(filter);
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [posts, countResult] = await Promise.all([
      db.query.postTable.findMany({
        where: whereClause,
        columns: { content: false },
        orderBy: (post, { desc }) => [
          desc(post.publishedAt),
          desc(post.createdAt),
        ],
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

  update: async (id: string, data: UpdatePostInput, wasPublished = false) => {
    const now = new Date();
    const [post] = await db
      .update(postTable)
      .set({
        ...data,
        updatedAt: now,
        // Set publishedAt only on first publish, never overwrite
        ...(data.published && !wasPublished ? { publishedAt: now } : {}),
      })
      .where(eq(postTable.id, id))
      .returning();
    return post;
  },

  delete: async (id: string) => {
    await db.delete(postTable).where(eq(postTable.id, id));
  },

  findAllTags: async (): Promise<string[]> => {
    const result = await db.execute(
      sql`SELECT DISTINCT unnest(tags) as tag FROM posts WHERE published = true ORDER BY tag`,
    );
    return (result.rows as { tag: string }[]).map((r) => r.tag);
  },
};
