'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const links = [{ titleKey: 'home' as const, href: '/' }];

export const Header = () => {
  const { isAuthenticated, clearToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tHeader = useTranslations('header');

  return (
    <div className="relative flex items-center justify-between px-4">
      <div className="flex-1" />
      <header className={cn('my-3 rounded-full border border-black px-6 py-1')}>
        {links.map((link) => (
          <Link
            key={link.titleKey}
            href={link.href}
            className={cn('border-black', pathname === link.href && 'border-b')}
          >
            {tNav(link.titleKey)}
          </Link>
        ))}
      </header>
      <div className="flex flex-1 flex-row items-center justify-end">
        {isAuthenticated ? (
          <button
            onClick={() => clearToken()}
            className="inline-flex items-center justify-center rounded-md border border-black px-3 py-1.5 text-sm transition-colors hover:bg-black/5"
          >
            <LogOutIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="rounded-md border border-black px-3 py-1.5 text-sm transition-colors hover:bg-black/5"
          >
            {tHeader('signIn')}
          </button>
        )}
      </div>
    </div>
  );
};
