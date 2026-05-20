'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EmailCaptureModal } from './EmailCaptureModal';

interface Props {
  plan: 'free' | 'pro';
  label: string;
  highlighted?: boolean;
}

export function PricingCTAButton({ plan, label, highlighted = false }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'mt-8 w-full rounded-md px-6 py-2.5 text-center text-sm font-medium transition-colors',
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border-border text-foreground hover:bg-muted border',
        )}
      >
        {label}
      </button>
      {open && <EmailCaptureModal plan={plan} onClose={() => setOpen(false)} />}
    </>
  );
}
