export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  publishedAt: Date | null;
  tags: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostSummary = Omit<Post, 'content'>;

export type CreatePostInput = {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
  published?: boolean;
  authorId: string;
};

export type UpdatePostInput = Partial<Omit<CreatePostInput, 'authorId'>> & {
  published?: boolean;
};

export type PostFilter = {
  authorId?: string;
  published?: boolean;
  query?: string;
  tag?: string;
};

export type PaginatedPosts = {
  posts: PostSummary[];
  total: number;
  page: number;
  totalPages: number;
};
