'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useOrg } from '@/hooks/useOrg';

export const Header = () => {
  const { isAuthenticated, clearToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('header');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { clearOrg } = useOrg();

  const isPricing = pathname === ROUTES.PRICING;

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const ids = ['features', 'pricing', 'faq'];

    const update = () => {
      const mid = window.innerHeight / 2;
      let found: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= mid && bottom >= mid) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };

    update();
    document.addEventListener('scroll', update, {
      passive: true,
      capture: true,
    });
    return () =>
      document.removeEventListener('scroll', update, { capture: true });
  }, [pathname]);

  const navLink = (active: boolean) =>
    cn(
      'text-sm transition-colors delay-200',
      active
        ? 'text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground',
    );

  const handleSignOut = () => {
    clearToken();
  };

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
          <Link
            href="/#features"
            className={navLink(activeSection === 'features')}
          >
            {t('nav.features')}
          </Link>
          <button
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                router.push(ROUTES.PRICING);
              }
            }}
            className={navLink(isPricing || activeSection === 'pricing')}
          >
            {t('nav.pricing')}
          </button>
          <Link href="/#faq" className={navLink(activeSection === 'faq')}>
            {t('nav.faq')}
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
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
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
