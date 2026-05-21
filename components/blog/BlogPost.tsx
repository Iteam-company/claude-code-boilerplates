import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { markdownToHtml } from '@/lib/markdown';
import type { Post } from '@/modules/post';

interface Props {
  post: Post;
}

export async function BlogPost({ post }: Props) {
  const html = await markdownToHtml(post.content);

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          ← All posts
        </Link>

        <header className="mt-8 mb-10">
          <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={cn(
                    'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <article
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Container>
  );
}
