import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';
import { FooterLinkList } from './FooterLinkList';
import { FooterEmailCapture } from './FooterEmailCapture';

const GITHUB_URL = 'https://github.com/Iteam-company/claude-code-boilerplates';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-border bg-card border-t">
      <Container className="py-12">
        {/* 4-column link grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <FooterLinkList
            heading={t('product.heading')}
            links={[
              { label: t('product.features'), href: '/#features' },
              { label: t('product.pricing'), href: '/#pricing' },
              { label: t('product.skills'), href: '/#skills' },
              { label: t('product.roadmap'), href: '#' },
            ]}
          />

          <FooterLinkList
            heading={t('compare.heading')}
            links={[
              { label: t('compare.shipfast'), href: '/compare/shipfast' },
              { label: t('compare.makerkit'), href: '/compare/makerkit' },
              {
                label: t('compare.supastarter'),
                href: '/compare/supastarter',
              },
            ]}
          />

          <FooterLinkList
            heading={t('resources.heading')}
            links={[
              { label: t('resources.docs'), href: '#' },
              { label: t('resources.blog'), href: ROUTES.BLOG },
              { label: t('resources.github'), href: GITHUB_URL },
              { label: t('resources.discord'), href: '#' },
            ]}
          />

          <FooterLinkList
            heading={t('legal.heading')}
            links={[
              { label: t('legal.license'), href: '#' },
              { label: t('legal.refund'), href: '#' },
              { label: t('legal.privacy'), href: '#' },
              { label: t('legal.terms'), href: '#' },
            ]}
          />
        </div>

        {/* Bottom row */}
        <div className="border-border mt-10 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo + copyright */}
          <div>
            <Link href="/" className="text-foreground text-sm font-bold">
              Claude Code Boilerplate
            </Link>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </div>

          {/* Social + email capture */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {/* LinkedIn */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </Link>
              <Link
                href={GITHUB_URL}
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {/* GitHub */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {/* YouTube */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              </Link>
            </div>

            <FooterEmailCapture
              placeholder={t('emailPlaceholder')}
              cta={t('emailCta')}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
