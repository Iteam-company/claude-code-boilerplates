import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Post } from '@/modules/post';

type Props = {
  post: Post;
};

export function BlogPostContent({ post }: Props) {
  return (
    <article>
      <header className="not-prose mb-8">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {post.description}
        </p>
      </header>

      <MDXRemote source={post.content} />
    </article>
  );
}
