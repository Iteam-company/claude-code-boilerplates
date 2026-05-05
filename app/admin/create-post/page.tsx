'use client';

import { Container } from '@/components/Container';
import Editor from '@/components/Editor';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/lib/routes';
import {
  createPostSchema,
  CreatePostSchemaType,
} from '@/modules/post/post.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const CreatePostPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(createPostSchema),
    shouldUnregister: true,
  });

  const handleCreatePost = (data: CreatePostSchemaType) => {
    console.log(data);
  };

  const handleCancel = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <Container className="flex h-full flex-col space-y-4 py-4">
      <h1 className="text-4xl font-semibold">Create post</h1>
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="h-full space-y-2"
      >
        <div className="flex flex-row gap-2">
          <div className="flex-1">
            <Input {...register('title')} placeholder="Title" />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </div>
          <div className="flex-1">
            <Input {...register('slug')} placeholder="Slug" />
            {errors.slug && <ErrorMessage>{errors.slug.message}</ErrorMessage>}
          </div>
        </div>
        <div>
          <Input {...register('description')} placeholder="Description" />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div>
              <Editor
                initialValue={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="min-h-125"
              />
              {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
              )}
            </div>
          )}
        />

        <div className="space-x-4 pt-4">
          <Button type="submit" className="px-6 py-4">
            Create Post
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="px-6 py-4"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreatePostPage;
