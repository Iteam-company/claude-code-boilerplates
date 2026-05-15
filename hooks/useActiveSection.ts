'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection(ids: string[]) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const idsRef = useRef(ids);

  useEffect(() => {
    if (pathname !== '/') {
      setActive(null);
      return;
    }

    const update = () => {
      const mid = window.innerHeight / 2;
      let found: string | null = null;
      for (const id of idsRef.current) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= mid && bottom >= mid) {
          found = id;
          break;
        }
      }
      setActive(found);
    };

    update();
    document.addEventListener('scroll', update, {
      passive: true,
      capture: true,
    });
    return () =>
      document.removeEventListener('scroll', update, { capture: true });
  }, [pathname]);

  return active;
}
