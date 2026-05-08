'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Container } from '@/components/Container';

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container>
        <div className="relative flex h-14 items-center justify-between">
          <Link href="/" className="text-foreground font-semibold">
            Boilerplate
          </Link>

          <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'hover:text-foreground text-sm transition-colors',
                  pathname === link.href ||
                    (link.title === 'Blog' && pathname.startsWith('/blog'))
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground',
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
