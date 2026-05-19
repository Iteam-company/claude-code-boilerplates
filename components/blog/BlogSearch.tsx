'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const DEBOUNCE_MS = 350;

interface Props {
  defaultValue?: string;
}

export function BlogSearch({ defaultValue }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue ?? '');
  const debounced = useDebounce(value, DEBOUNCE_MS);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const q = debounced.trim();
    router.push(q ? `/blog?q=${encodeURIComponent(q)}` : '/blog');
  }, [debounced, router]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search posts..."
        className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border py-2 pr-9 pl-9 text-sm outline-none focus:ring-2 disabled:opacity-50"
        aria-label="Search posts"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <X className="text-muted-foreground h-4 w-4" />
        </button>
      )}
    </div>
  );
}
