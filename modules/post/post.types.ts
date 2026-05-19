export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
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
  authorId: string;
};

export type UpdatePostInput = Partial<Omit<CreatePostInput, 'authorId'>> & {
  published?: boolean;
};

export type PaginatedPosts = {
  posts: PostSummary[];
  total: number;
  page: number;
  totalPages: number;
};
