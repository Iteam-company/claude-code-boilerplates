'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/routes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/Iteam-company/claude-code-boilerplates')
      .then((r) => r.json())
      .then(
        (d) =>
          typeof d.stargazers_count === 'number' &&
          setStars(d.stargazers_count),
      )
      .catch(() => {});
  }, []);

  const navLink = (active: boolean) =>
    cn(
      'text-sm transition-colors',
      active
        ? 'text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground',
    );

  return (
    <header
      role="banner"
      className={cn(
        'border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-200',
        scrolled ? 'py-2' : 'py-3',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-foreground text-base font-bold tracking-tight"
        >
          Claude Code Boilerplate
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          <Link href="/" className={navLink(pathname === '/')}>
            Features
          </Link>
          <a href="/#pricing" className={navLink(false)}>
            Pricing
          </a>
          <Link
            href={ROUTES.BLOG}
            className={navLink(pathname.startsWith('/blog'))}
          >
            Blog
          </Link>
          <a
            href="https://github.com/Iteam-company/claude-code-boilerplates"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(navLink(false), 'flex items-center gap-1.5')}
          >
            GitHub
            {stars !== null && (
              <span className="border-border text-muted-foreground flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-xs">
                <Star className="h-3 w-3 fill-current" />
                {formatStars(stars)}
              </span>
            )}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/#pricing"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Get started →
          </a>
        </div>
      </div>
    </header>
  );
};
