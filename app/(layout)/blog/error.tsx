'use client';
import { useEffect } from 'react';
import { Container } from '@/components/Container';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground">Failed to load posts.</p>
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </Container>
  );
}
