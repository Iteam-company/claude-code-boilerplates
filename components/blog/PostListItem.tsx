import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { PostSummary } from '@/modules/post';

interface Props {
  post: PostSummary;
  index: number;
  activeTag?: string;
}

export function PostListItem({ post, index, activeTag }: Props) {
  return (
    <li className="border-border border-t py-8 first:border-t-0">
      <div className="flex gap-6">
        <span className="text-muted-foreground mt-0.5 w-6 shrink-0 font-mono text-sm tabular-nums">
          {String(index + 1).padStart(2, '0')}.
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Link
              href={`/blog/${post.slug}`}
              className="text-foreground hover:text-muted-foreground text-lg font-semibold transition-colors"
            >
              {post.title}
            </Link>
            <span className="text-muted-foreground text-sm">
              {format(new Date(post.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-xs transition-colors',
                    tag === activeTag
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
