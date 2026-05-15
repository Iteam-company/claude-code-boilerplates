import { postRepo } from './post.repo';
import { CreatePostInput, UpdatePostInput } from './post.types';
import { HttpError } from '@/lib/errors/http-error';

export const postService = {
  create: async (data: CreatePostInput) => {
    const existing = await postRepo.findBySlug(data.slug);
    if (existing) {
      throw new HttpError(409, 'A post with this slug already exists');
    }
    return postRepo.create(data);
  },

  getAll: async (filter?: { authorId?: string; published?: boolean }) => {
    return postRepo.findAll(filter);
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

  update: async (id: string, data: UpdatePostInput) => {
    const post = await postRepo.findById(id);
    if (!post) {
      throw new HttpError(404, 'Post not found');
    }

    if (data.slug && data.slug !== post.slug) {
      const slugTaken = await postRepo.findBySlug(data.slug);
      if (slugTaken) {
        throw new HttpError(409, 'A post with this slug already exists');
      }
    }

    return postRepo.update(id, data);
  },

  delete: async (id: string) => {
    const post = await postRepo.findById(id);
    if (!post) {
      throw new HttpError(404, 'Post not found');
    }
    return postRepo.delete(id);
  },
};
