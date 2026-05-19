import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  page: number;
  totalPages: number;
}

export function BlogPagination({ page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p === 1 ? '/blog' : `/blog?page=${p}`);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      <Link
        href={href(page - 1)}
        aria-label="Previous page"
        aria-disabled={page === 1}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
          page === 1
            ? 'text-muted-foreground pointer-events-none opacity-40'
            : 'hover:bg-muted text-foreground',
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
            p === page
              ? 'bg-foreground text-background'
              : 'hover:bg-muted text-foreground',
          )}
        >
          {p}
        </Link>
      ))}

      <Link
        href={href(page + 1)}
        aria-label="Next page"
        aria-disabled={page === totalPages}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
          page === totalPages
            ? 'text-muted-foreground pointer-events-none opacity-40'
            : 'hover:bg-muted text-foreground',
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
