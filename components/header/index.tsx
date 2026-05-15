'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { ProductDropdown } from './ProductDropdown';
import { AuthButton } from './AuthButton';

export const Header = () => {
  const pathname = usePathname();
  const t = useTranslations('header');

  const navLink = (active: boolean) =>
    cn(
      'text-sm transition-colors delay-200',
      active
        ? 'text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground',
    );

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-foreground text-base font-bold tracking-tight"
        >
          Claude Code Boilerplate
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <ProductDropdown />
          <Link
            href={ROUTES.BLOG}
            className={navLink(
              pathname === ROUTES.BLOG || pathname.startsWith('/blog'),
            )}
          >
            {t('nav.blog')}
          </Link>
          <Link
            href={ROUTES.DEMO}
            className={navLink(
              pathname === ROUTES.DEMO || pathname.startsWith('/demo'),
            )}
          >
            {t('nav.demo')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Iteam-company/claude-code-boilerplates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
          >
            GitHub
          </a>
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
