import { getTranslations } from 'next-intl/server';
import { Star } from 'lucide-react';
import { Container } from '@/components/Container';
import { STAR_THRESHOLD, SUBSCRIBER_THRESHOLD } from '@/lib/constants';
import { formatNumber } from '@/lib/format';

const BUILT_WITH = ['Next.js', 'Vercel', 'Neon', 'Stripe', 'Anthropic'];

interface Props {
  stars?: number | null;
  subscribers?: number | null;
}

export async function SocialProof({ stars = null, subscribers = null }: Props) {
  const t = await getTranslations('landing.socialProof');

  const showStars = stars !== null && stars >= STAR_THRESHOLD;
  const showSubscribers =
    subscribers !== null && subscribers >= SUBSCRIBER_THRESHOLD;

  return (
    <section className="border-border/50 border-y py-12">
      <Container>
        <div className="space-y-10">
          <div className="flex flex-col items-center gap-5">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              {t('builtWith')}
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
                    {formatNumber(subscribers!)}
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
                    {formatNumber(stars!)}
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
