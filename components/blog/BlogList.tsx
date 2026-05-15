'use client';
import { usePosts } from '@/hooks/api/post';
import { PostListItem } from './PostListItem';
import { Container } from '@/components/Container';

export function BlogList() {
  const { data: posts, isLoading, error } = usePosts();

  return (
    <Container className="py-16">
      <div className="mb-12">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Blog{' '}
          {posts && (
            <span className="text-muted-foreground text-lg font-normal">
              {posts.length} posts
            </span>
          )}
        </h1>
      </div>

      {isLoading && (
        <div className="text-muted-foreground text-sm">Loading posts…</div>
      )}

      {error && (
        <div className="text-destructive text-sm">
          Failed to load posts. Please try again.
        </div>
      )}

      {posts && (
        <ol className="space-y-0">
          {posts.map((post, index) => (
            <PostListItem key={post.slug} post={post} index={index} />
          ))}
        </ol>
      )}
    </Container>
  );
}
