'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Header = () => {
  const { isAuthenticated, clearToken } = useAuth();
  const router = useRouter();
  const t = useTranslations('header');

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
          <a
            href="/#features"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {t('nav.features')}
          </a>
          <Link
            href={ROUTES.PRICING}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {t('nav.pricing')}
          </Link>
          <a
            href="/#faq"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {t('nav.faq')}
          </a>
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
          {isAuthenticated ? (
            <button
              onClick={() => clearToken()}
              className="border-border hover:bg-muted inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm transition-colors"
            >
              <LogOutIcon className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => router.push(ROUTES.SIGNIN)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {t('signIn')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
