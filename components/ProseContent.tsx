'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const CLIPBOARD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;

const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

interface Props {
  html: string;
  className?: string;
}

export function ProseContent({ html, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.querySelectorAll('pre').forEach((pre) => {
      if (pre.dataset.copyAdded) return;
      pre.dataset.copyAdded = 'true';
      pre.style.position = 'relative';

      const btn = document.createElement('button');
      btn.setAttribute('aria-label', 'Copy code');
      btn.className =
        'absolute top-2.5 right-2.5 rounded-md p-1.5 transition-colors text-zinc-400 hover:text-zinc-100 hover:bg-white/10';
      btn.innerHTML = CLIPBOARD_SVG;

      let timer: ReturnType<typeof setTimeout>;
      btn.addEventListener('click', async () => {
        const text = pre.querySelector('code')?.innerText ?? '';
        await navigator.clipboard.writeText(text);
        btn.innerHTML = CHECK_SVG;
        clearTimeout(timer);
        timer = setTimeout(() => {
          btn.innerHTML = CLIPBOARD_SVG;
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
