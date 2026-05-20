'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/routes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
export const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
