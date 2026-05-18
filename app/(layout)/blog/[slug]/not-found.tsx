import type { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: '404 — Post Not Found',
  description: 'This post does not exist or has been removed.',
};

export default function BlogPostNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-foreground text-6xl font-bold">404</h1>
      <p className="text-muted-foreground text-lg">Post not found</p>
      <Link
        href={ROUTES.BLOG}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        Back to blog
      </Link>
    </div>
  );
}
