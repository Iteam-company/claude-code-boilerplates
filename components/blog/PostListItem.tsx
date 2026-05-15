import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import type { Post } from '@/lib/blog';

interface Props {
  post: Post;
  index: number;
}

export function PostListItem({ post, index }: Props) {
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
              {format(parseISO(post.date), 'MMM d, yyyy')}
            </span>
          </div>
          <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
