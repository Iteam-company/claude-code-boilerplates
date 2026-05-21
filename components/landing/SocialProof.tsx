'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Container } from '@/components/Container';

const STAR_THRESHOLD = 500;
const SUBSCRIBER_THRESHOLD = 500;

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const BUILT_WITH = ['Next.js', 'Vercel', 'Neon', 'Stripe', 'Anthropic'];

export function SocialProof() {
  const [stars, setStars] = useState<number | null>(null);
  const [subscribers, setSubscribers] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Iteam-company/claude-code-boilerplates')
      .then((r) => r.json())
      .then(
        (d) =>
          typeof d.stargazers_count === 'number' &&
          setStars(d.stargazers_count),
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/spots')
      .then((r) => r.json())
      .then(
        (d) =>
          typeof d.subscribers === 'number' && setSubscribers(d.subscribers),
      )
      .catch(() => {});
  }, []);

  const showStars = stars !== null && stars >= STAR_THRESHOLD;
  const showSubscribers =
    subscribers !== null && subscribers > SUBSCRIBER_THRESHOLD;

  return (
    <section className="border-border/50 border-y py-12">
      <Container>
        <div className="space-y-10">
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://github.com/Iteam-company/claude-code-boilerplates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View source on GitHub
            </a>
            <span className="text-muted-foreground text-xs">
              MIT licensed &middot; open source forever
            </span>
          </div>

          <div className="bg-border mx-auto h-px w-24" />

          <div className="flex flex-col items-center gap-5">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              Built with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {BUILT_WITH.map((brand) => (
                <span
                  key={brand}
                  className="text-muted-foreground font-semibold"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {(showStars || showSubscribers) && (
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {showSubscribers && (
                <span className="text-muted-foreground">
                  <span className="text-foreground font-semibold">
                    {formatCount(subscribers!)}
                  </span>{' '}
                  developers joined
                </span>
              )}
              {showStars && showSubscribers && (
                <span className="text-muted-foreground">&middot;</span>
              )}
              {showStars && (
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="text-foreground font-semibold">
                    {formatCount(stars!)}
                  </span>
                  <span className="text-muted-foreground">GitHub stars</span>
                </span>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
