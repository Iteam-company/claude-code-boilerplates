'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { DocMeta } from '@/lib/docs';

interface Props {
  docs: DocMeta[];
}

export function DocsSidebar({ docs }: Props) {
  const pathname = usePathname();

  const sections = [...new Set(docs.map((d) => d.section ?? ''))];

  return (
    <nav aria-label="Documentation" className="w-56 shrink-0">
      {sections.map((section, si) => (
        <div key={section || '__unsectioned'}>
          {section && (
            <p
              className={cn(
                'text-muted-foreground mb-1 px-3 text-xs font-semibold tracking-widest uppercase',
                si > 0 && 'mt-5',
              )}
              aria-hidden="true"
            >
              {section}
            </p>
          )}
          <ul className="space-y-1">
            {docs
              .filter((d) => (d.section ?? '') === section)
              .map((doc) => {
                const href = `/docs/${doc.slug}`;
                const active = pathname === href;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'block rounded-md px-3 py-1.5 text-sm transition-colors',
                        active
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                      )}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
