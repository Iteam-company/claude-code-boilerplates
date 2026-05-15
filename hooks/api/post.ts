import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { api, authApi } from '@/lib/fetcher';
import {
  PostSummary,
  Post,
  CreatePostSchemaType,
  UpdatePostSchemaType,
} from '@/modules/post';

export const usePosts = () => {
  return useSWR<PostSummary[]>('/api/posts', api.get);
};

export const usePost = (slug: string) => {
  return useSWR<Post>(`/api/posts/slug/${slug}`, api.get);
};

export const useCreatePost = () => {
  return useSWRMutation<Post, Error, string, CreatePostSchemaType>(
    '/api/posts',
    api.post<CreatePostSchemaType, Post>,
  );
};

export const useUpdatePost = (id: string) => {
  return useSWRMutation<Post, Error, string, UpdatePostSchemaType>(
    `/api/posts/${id}`,
    api.put<UpdatePostSchemaType, Post>,
  );
};

export const useDeletePost = (id: string) => {
  return useSWRMutation<void, Error, string>(`/api/posts/${id}`, api.delete);
};

export const useSelfPosts = () => {
  return useSWR<PostSummary[]>('/api/posts?self=true', authApi.get);
};
