import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { ROUTES } from '@/lib/routes';
import { FooterLinkList } from './FooterLinkList';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-border bg-card border-t">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <span className="text-foreground text-lg font-bold">
              Claude Code Boilerplate
            </span>
            <p className="text-muted-foreground mt-2 text-sm">{t('tagline')}</p>
          </div>

          <FooterLinkList
            heading={t('nav.heading')}
            links={[
              { label: t('nav.features'), href: '/#features' },
              { label: t('nav.skills'), href: '/#skills' },
              { label: t('nav.pricing'), href: ROUTES.PRICING },
              { label: t('nav.faq'), href: '/#faq' },
            ]}
          />

          <FooterLinkList
            heading={t('explore.heading')}
            links={[
              { label: t('explore.blog'), href: ROUTES.BLOG },
              { label: t('explore.demo'), href: ROUTES.DEMO },
              {
                label: t('explore.github'),
                href: 'https://github.com/Iteam-company/claude-code-boilerplates',
              },
            ]}
          />

          <FooterLinkList
            heading={t('legal.heading')}
            links={[
              { label: t('legal.privacy'), href: '#' },
              { label: t('legal.terms'), href: '#' },
            ]}
          />
        </div>

        <div className="border-border text-muted-foreground mt-10 border-t pt-6 text-center text-sm">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </Container>
    </footer>
  );
}
