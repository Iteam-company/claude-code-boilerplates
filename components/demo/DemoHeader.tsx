'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useOrg } from '@/hooks/useOrg';
import { ROUTES } from '@/lib/routes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { OrgSwitcher } from './OrgSwitcher';
import { LogOut } from 'lucide-react';

const FROM = `?from=${ROUTES.DEMO_DASHBOARD}`;

export const DemoHeader = () => {
  const { isAuthenticated, clearToken } = useAuth();
  const { clearOrg } = useOrg();
  const router = useRouter();

  const handleSignOut = () => {
    clearToken();
    clearOrg();
    router.push(ROUTES.DEMO_DASHBOARD);
  };

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Link
          href={ROUTES.DEMO}
          className="text-foreground text-sm font-bold tracking-tight"
        >
          Demo
        </Link>
        {isAuthenticated && <OrgSwitcher />}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isAuthenticated ? (
          <button
            onClick={handleSignOut}
            className="border-border hover:bg-muted inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        ) : (
          <>
            <Link
              href={`${ROUTES.SIGNUP}${FROM}`}
              className="border-border hover:bg-muted rounded-md border px-4 py-1.5 text-sm transition-colors"
            >
              Sign up
            </Link>
            <Link
              href={`${ROUTES.SIGNIN}${FROM}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-1.5 text-sm font-medium transition-colors"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
