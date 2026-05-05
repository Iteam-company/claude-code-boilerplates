'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderLinksType } from '@/types/header';
import { FC } from 'react';

type Props = {
  links: HeaderLinksType;
};

export const Header: FC<Props> = ({ links }) => {
  const { isAuthenticated, clearToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-between px-4">
      <div className="flex-1" />
      <header
        className={cn(
          'my-3 rounded-full border border-black px-6 py-1',
          'flex flex-row gap-3',
        )}
      >
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className={cn('border-black', pathname === link.href && 'border-b')}
          >
            {link.title}
          </Link>
        ))}
      </header>
      <div className="flex flex-1 flex-row items-center justify-end">
        {isAuthenticated ? (
          <Button onClick={() => clearToken()}>
            <LogOutIcon />
          </Button>
        ) : (
          <Button
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="text-sm"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
