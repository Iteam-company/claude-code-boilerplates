'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  tags: string[];
  activeTag?: string;
  query?: string;
}

export function BlogTagFilter({ tags, activeTag, query }: Props) {
  const router = useRouter();

  if (tags.length === 0) return null;

  const handleTag = (tag: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (activeTag !== tag) params.set('tag', tag);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : '/blog');
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => handleTag(tag)}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            activeTag === tag
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
