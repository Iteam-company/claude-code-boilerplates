import Link from 'next/link';
import { Container } from '@/components/Container';

interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function Hero({ title, subtitle, cta, secondaryCta }: HeroProps) {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground mt-6 text-lg">{subtitle}</p>
          )}
          {(cta || secondaryCta) && (
            <div className="mt-10 flex items-center justify-center gap-4">
              {cta && (
                <Link
                  href={cta.href}
                  className="bg-primary text-primary-foreground rounded-md px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="text-foreground text-sm font-semibold underline-offset-4 hover:underline"
                >
                  {secondaryCta.label} →
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
