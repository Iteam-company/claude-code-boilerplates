'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/lib/routes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const navItems = (
  t: (k: string) => string,
  pathname: string,
  pricingActive: boolean,
) => [
  {
    href: pathname === '/' ? '/#features' : '/',
    label: t('nav.features'),
    active: pathname === '/',
  },
  { href: '/#pricing', label: t('nav.pricing'), active: pricingActive },
  {
    href: ROUTES.BLOG,
    label: t('nav.blog'),
    active: pathname.startsWith('/blog'),
  },
  {
    href: '/docs',
    label: t('nav.docs'),
    active: pathname.startsWith('/docs'),
  },
];

export const Header = () => {
  const t = useTranslations('header');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [pricingActive, setPricingActive] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById('pricing');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPricingActive(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const items = navItems(
    (k) => t(k as Parameters<typeof t>[0]),
    pathname,
    pricingActive,
  );

  const navLink = (active: boolean) =>
    cn(
      'text-sm transition-colors',
      active
        ? 'text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground',
    );

  return (
    <>
      <header
        role="banner"
        className={cn(
          'border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-200',
          scrolled ? 'py-2' : 'py-3',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-foreground text-base font-bold tracking-tight"
          >
            {t('brand')}
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLink(item.active)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#pricing"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors md:flex"
            >
              {t('getStarted')}
            </Link>
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="text-muted-foreground hover:text-foreground -mr-1 flex items-center justify-center rounded-md p-1.5 transition-colors md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="bg-background fixed inset-0 z-40 flex flex-col pt-16 md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-4 text-2xl font-medium transition-colors',
                      item.active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.2, ease: 'easeOut' }}
              className="border-border border-t px-6 py-6"
            >
              <Link
                href="/#pricing"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 block w-full rounded-md px-4 py-3 text-center text-base font-medium transition-colors"
              >
                {t('getStarted')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
