'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogPostError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground">Failed to load post.</p>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Try again
          </button>
          <Link
            href={ROUTES.BLOG}
            className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >
            Back to blog
          </Link>
        </div>
      </div>
    </Container>
  );
}
