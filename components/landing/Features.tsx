import { getTranslations } from 'next-intl/server';
import {
  Zap,
  Database,
  Lock,
  CreditCard,
  Mail,
  Cloud,
  Palette,
  SunMoon,
  FileText,
  Rocket,
  Bot,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/Container';
import { FadeIn } from './FadeIn';

const FEATURE_ICONS: LucideIcon[] = [
  Zap,
  Database,
  Lock,
  CreditCard,
  Mail,
  Cloud,
  Palette,
  SunMoon,
  FileText,
  Rocket,
  Bot,
  Wrench,
];

const FEATURE_KEYS = [
  'nextjs',
  'drizzle',
  'auth',
  'stripe',
  'email',
  'uploads',
  'ui',
  'theme',
  'blog',
  'deploy',
  'claudeConfig',
  'skills',
] as const;

export async function Features() {
  const t = await getTranslations('landing.features');
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <h2 className="text-foreground mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight md:text-5xl">
            {t('heading')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map((key, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={key}
                  className="border-border bg-muted/30 flex items-start gap-4 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      {t(`items.${key}.title`)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
