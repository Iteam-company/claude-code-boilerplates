'use client';

import { useState } from 'react';
import { EmailCaptureModal } from '@/components/landing/EmailCaptureModal';

interface Props {
  placeholder: string;
  cta: string;
}

export function FooterEmailCapture({ placeholder, cta }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
      >
        {cta}
      </button>
      {open && <EmailCaptureModal plan="free" onClose={() => setOpen(false)} />}
    </>
  );
}
