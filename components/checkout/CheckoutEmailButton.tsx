'use client';

import { useState } from 'react';
import { EmailCaptureModal } from '../landing/EmailCaptureModal';

interface Props {
  label: string;
  plan?: 'free' | 'pro';
  className?: string;
}

export function CheckoutEmailButton({ label, plan = 'pro', className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open && <EmailCaptureModal plan={plan} onClose={() => setOpen(false)} />}
    </>
  );
}
