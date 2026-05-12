import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/Container';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-border bg-card border-t">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <span className="text-foreground text-lg font-bold">
              Claude Code Boilerplate
            </span>
            <p className="text-muted-foreground mt-2 text-sm">{t('tagline')}</p>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-semibold">
              {t('nav.heading')}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t('nav.features')}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t('nav.pricing')}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t('nav.faq')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-semibold">
              {t('legal.heading')}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t('legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-border text-muted-foreground mt-10 border-t pt-6 text-center text-sm">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </Container>
    </footer>
  );
}
