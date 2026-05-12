'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export function FAQ() {
  const t = useTranslations('landing.faq');
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <section id="faq" className="bg-muted py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {t('heading')}
          </h2>
        </div>
        <ul className="divide-border mx-auto mt-10 max-w-2xl divide-y">
          {FAQ_KEYS.map((key) => (
            <li key={key}>
              <button
                onClick={() => toggle(key)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="text-foreground font-medium">
                  {t(`items.${key}.question`)}
                </span>
                <ChevronDownIcon
                  className={cn(
                    'text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200',
                    open === key && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  open === key ? 'max-h-96 pb-5' : 'max-h-0',
                )}
              >
                <p className="text-muted-foreground">
                  {t(`items.${key}.answer`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
