'use client';
import { PostListItem } from './PostListItem';
import { Container } from '@/components/Container';
import type { PostSummary } from '@/modules/post';

interface Props {
  posts: PostSummary[];
}

export function BlogList({ posts }: Props) {
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
