import type { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-foreground text-6xl font-bold">404</h1>
      <p className="text-muted-foreground text-lg">Page not found</p>
      <Link
        href={ROUTES.HOME}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
