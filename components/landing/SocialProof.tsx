'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Container } from '@/components/Container';

const STAR_THRESHOLD = 500;

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const FEATURED_ON = [
  { label: 'Product Hunt', href: '#' },
  { label: 'Hacker News', href: '#' },
  { label: 'awesome-claude-code', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

const BUILT_WITH = ['Next.js', 'Vercel', 'Neon', 'Stripe', 'Anthropic'];

export function SocialProof() {
  const [stars, setStars] = useState<number | null>(null);

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

  const showStars = stars !== null && stars >= STAR_THRESHOLD;

  return (
    <section className="border-border/50 border-y py-12">
      <Container>
        <div className="space-y-10">
          <div className="flex flex-col items-center gap-5">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              As featured on
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {FEATURED_ON.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-foreground font-semibold transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
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

          {showStars && (
            <div className="flex items-center justify-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="text-foreground font-semibold">
                {formatCount(stars!)}
              </span>
              <span className="text-muted-foreground">GitHub stars</span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
