import { postRepo } from './post.repo';
import { CreatePostInput, PostFilter, UpdatePostInput } from './post.types';
import { HttpError } from '@/lib/errors/http-error';
import { submitUrl } from '@/lib/indexnow';

const PAGE_SIZE = 6;

export const postService = {
  create: async (data: CreatePostInput) => {
    const existing = await postRepo.findBySlug(data.slug);
    if (existing) {
      throw new HttpError(409, 'A post with this slug already exists');
    }
    return postRepo.create(data);
  },

  getAll: async (filter?: PostFilter) => {
    return postRepo.findAll(filter);
  },

  getPaginated: async (filter: PostFilter | undefined, page: number) => {
    const safePage = Math.max(1, page);
    const { posts, total } = await postRepo.findPaginated(
      filter,
      safePage,
      PAGE_SIZE,
    );
    return {
      posts,
      total,
      page: safePage,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    };
  },

  getById: async (id: string) => {
    const post = await postRepo.findById(id);
    if (!post) throw new HttpError(404, 'Post not found');
    return post;
  },

  getBySlug: async (slug: string) => {
    const post = await postRepo.findBySlug(slug);
    if (!post) {
      throw new HttpError(404, 'Post not found');
    }
    return post;
  },

  update: async (id: string, data: UpdatePostInput, callerId: string) => {
    const post = await postRepo.findById(id);
    if (!post) {
      throw new HttpError(404, 'Post not found');
    }
    if (post.authorId !== callerId) {
      throw new HttpError(403, 'Forbidden');
    }

    if (data.slug && data.slug !== post.slug) {
      const slugTaken = await postRepo.findBySlug(data.slug);
      if (slugTaken) {
        throw new HttpError(409, 'A post with this slug already exists');
      }
    }

    const updated = await postRepo.update(id, data);
    if (data.published) void submitUrl(`/blog/${updated.slug}`);
    return updated;
  },

  delete: async (id: string, callerId: string) => {
    const post = await postRepo.findById(id);
    if (!post) {
      throw new HttpError(404, 'Post not found');
    }
    if (post.authorId !== callerId) {
      throw new HttpError(403, 'Forbidden');
    }
    return postRepo.delete(id);
  },

  getTags: async (): Promise<string[]> => {
    return postRepo.findAllTags();
  },
};
