import { PostListItem } from './PostListItem';
import { BlogPagination } from './BlogPagination';
import { Container } from '@/components/Container';
import type { PostSummary } from '@/modules/post';

interface Props {
  posts: PostSummary[];
  total: number;
  page: number;
  totalPages: number;
}

export function BlogList({ posts, total, page, totalPages }: Props) {
  return (
    <Container className="py-16">
      <div className="mb-12">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Blog{' '}
          <span className="text-muted-foreground text-lg font-normal">
            {total} posts
          </span>
        </h1>
      </div>

      <ol className="space-y-0">
        {posts.map((post, index) => (
          <PostListItem
            key={post.slug}
            post={post}
            index={(page - 1) * 6 + index}
          />
        ))}
      </ol>

      <BlogPagination page={page} totalPages={totalPages} />
    </Container>
  );
}
