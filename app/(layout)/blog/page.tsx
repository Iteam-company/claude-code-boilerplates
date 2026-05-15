import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { getAllPosts } from '@/lib/blog';
import { PostListItem } from '@/components/blog/PostListItem';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on development, design, and building software.',
  openGraph: {
    title: 'Blog | Claude Code Boilerplate',
    description: 'Thoughts on development, design, and building software.',
    url: '/blog',
  },
  twitter: {
    title: 'Blog | Claude Code Boilerplate',
    description: 'Thoughts on development, design, and building software.',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container className="py-16">
      <div className="mb-12">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Blog{' '}
          <span className="text-muted-foreground text-lg font-normal">
            {posts.length} posts
          </span>
        </h1>
      </div>

      <ol className="space-y-0">
        {posts.map((post, index) => (
          <PostListItem key={post.slug} post={post} index={index} />
        ))}
      </ol>
    </Container>
  );
}
