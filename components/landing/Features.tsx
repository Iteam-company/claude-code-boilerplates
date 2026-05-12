import { getTranslations } from 'next-intl/server';
import {
  LockKeyholeIcon,
  CreditCardIcon,
  MailIcon,
  DatabaseIcon,
  SunMoonIcon,
  GlobeIcon,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/Container';

interface FeatureItem {
  key: 'auth' | 'payments' | 'email' | 'database' | 'darkMode' | 'i18n';
  Icon: LucideIcon;
}

const features: FeatureItem[] = [
  { key: 'auth', Icon: LockKeyholeIcon },
  { key: 'payments', Icon: CreditCardIcon },
  { key: 'email', Icon: MailIcon },
  { key: 'database', Icon: DatabaseIcon },
  { key: 'darkMode', Icon: SunMoonIcon },
  { key: 'i18n', Icon: GlobeIcon },
];

export async function Features() {
  const t = await getTranslations('landing.features');

  return (
    <section id="features" className="bg-muted py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            {t('subheading')}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ key, Icon }) => (
            <div
              key={key}
              className="border-border bg-card rounded-xl border p-6"
            >
              <Icon className="text-primary h-8 w-8" />
              <h3 className="text-foreground mt-4 text-lg font-semibold">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground mt-2">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
