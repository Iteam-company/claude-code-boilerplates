'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { ChevronDown, Zap, CreditCard, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useClickOutside } from '@/hooks/useClickOutside';

const SECTION_IDS = ['features', 'pricing', 'faq'];

export const ProductDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('header');

  const activeSection = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const isPricing = pathname === ROUTES.PRICING;
  const isActive =
    isPricing ||
    activeSection === 'features' ||
    activeSection === 'pricing' ||
    activeSection === 'faq';

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const handlePricingClick = () => {
    setOpen(false);
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else router.push(ROUTES.PRICING);
  };

  const label = isPricing
    ? t('nav.pricing')
    : activeSection === 'features'
      ? t('nav.features')
      : activeSection === 'pricing'
        ? t('nav.pricing')
        : activeSection === 'faq'
          ? t('nav.faq')
          : t('nav.product');

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className={cn(
          'flex items-center gap-1 text-sm transition-colors delay-200',
          isActive
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <span key={label} className="nav-label-animate">
          {label}
        </span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </Link>

      {open && (
        <div
          className="bg-background border-border absolute top-full left-1/2 mt-2 w-52 -translate-x-1/2 rounded-xl border p-1.5 shadow-lg"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <Link
            href="/#features"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors',
              activeSection === 'features' ? 'bg-muted' : 'hover:bg-muted/60',
            )}
          >
            <Zap className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <div className="text-foreground text-sm leading-none font-medium">
                {t('nav.features')}
              </div>
              <div className="text-muted-foreground mt-1 text-xs leading-snug">
                {t('nav.featuresDesc')}
              </div>
            </div>
          </Link>

          <button
            onClick={handlePricingClick}
            className={cn(
              'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 transition-colors',
              isPricing || activeSection === 'pricing'
                ? 'bg-muted'
                : 'hover:bg-muted/60',
            )}
          >
            <CreditCard className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
            <div className="text-left">
              <div className="text-foreground text-sm leading-none font-medium">
                {t('nav.pricing')}
              </div>
              <div className="text-muted-foreground mt-1 text-xs leading-snug">
                {t('nav.pricingDesc')}
              </div>
            </div>
          </button>

          <Link
            href="/#faq"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors',
              activeSection === 'faq' ? 'bg-muted' : 'hover:bg-muted/60',
            )}
          >
            <HelpCircle className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <div className="text-foreground text-sm leading-none font-medium">
                {t('nav.faq')}
              </div>
              <div className="text-muted-foreground mt-1 text-xs leading-snug">
                {t('nav.faqDesc')}
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
