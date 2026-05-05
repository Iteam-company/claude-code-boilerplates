import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher, poster, putter, deleter } from '@/lib/fetcher';
import {
  PostSummary,
  Post,
  CreatePostSchemaType,
  UpdatePostSchemaType,
} from '@/modules/post';

export const usePosts = () => {
  return useSWR<PostSummary[]>('/api/posts', fetcher);
};

export const usePost = (slug: string) => {
  return useSWR<Post>(`/api/posts/${slug}`, fetcher);
};

export const useCreatePost = () => {
  return useSWRMutation<Post, Error, string, CreatePostSchemaType>(
    '/api/posts',
    poster<CreatePostSchemaType, Post>,
  );
};

export const useUpdatePost = (id: string) => {
  return useSWRMutation<Post, Error, string, UpdatePostSchemaType>(
    `/api/posts/${id}`,
    putter<UpdatePostSchemaType, Post>,
  );
};

export const useDeletePost = (id: string) => {
  return useSWRMutation<void, Error, string>(`/api/posts/${id}`, deleter);
};
