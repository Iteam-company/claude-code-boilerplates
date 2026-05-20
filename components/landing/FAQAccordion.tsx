'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  key: string;
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <ul className="divide-border mx-auto mt-10 max-w-2xl divide-y">
      {items.map(({ key, question, answer }) => (
        <li key={key}>
          <button
            onClick={() => toggle(key)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="text-foreground pr-4 font-medium">{question}</span>
            <ChevronDownIcon
              className={cn(
                'text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-400',
                open === key && 'rotate-180',
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-400',
              open === key ? 'max-h-96 pb-5' : 'max-h-0',
            )}
          >
            <p className="text-muted-foreground">{answer}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
