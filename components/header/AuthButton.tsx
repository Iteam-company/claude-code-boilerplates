'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/routes';

export function AuthButton() {
  const { isAuthenticated, clearToken } = useAuth();
  const router = useRouter();
  const t = useTranslations('header');

  if (isAuthenticated) {
    return (
      <button
        onClick={clearToken}
        className="border-border hover:bg-muted inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm transition-colors"
      >
        <LogOutIcon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push(ROUTES.SIGNIN)}
      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-1.5 text-sm font-medium transition-colors"
    >
      {t('signIn')}
    </button>
  );
}
