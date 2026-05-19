import { PostListItem } from './PostListItem';
import { BlogPagination } from './BlogPagination';
import { BlogSearch } from './BlogSearch';
import { BlogTagFilter } from './BlogTagFilter';
import { Container } from '@/components/Container';
import type { PostSummary } from '@/modules/post';

interface Props {
  posts: PostSummary[];
  total: number;
  page: number;
  totalPages: number;
  query?: string;
  allTags: string[];
  activeTag?: string;
}

export function BlogList({
  posts,
  total,
  page,
  totalPages,
  query,
  allTags,
  activeTag,
}: Props) {
  return (
    <Container className="py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Blog{' '}
          <span className="text-muted-foreground text-lg font-normal">
            {query
              ? `${total} result${total !== 1 ? 's' : ''}`
              : `${total} posts`}
          </span>
        </h1>
        <BlogSearch defaultValue={query} />
      </div>

      <BlogTagFilter tags={allTags} activeTag={activeTag} query={query} />

      {posts.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">
          No posts found{query ? ` for "${query}"` : ''}
          {activeTag ? ` tagged "${activeTag}"` : ''}.
        </p>
      ) : (
        <ol className="mt-8 space-y-0">
          {posts.map((post, index) => (
            <PostListItem
              key={post.slug}
              post={post}
              index={(page - 1) * 6 + index}
              activeTag={activeTag}
            />
          ))}
        </ol>
      )}

      <BlogPagination
        page={page}
        totalPages={totalPages}
        query={query}
        tag={activeTag}
      />
    </Container>
  );
}
