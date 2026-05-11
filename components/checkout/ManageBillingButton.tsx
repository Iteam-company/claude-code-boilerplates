'use client';

import { toast } from 'sonner';
import { usePortal } from '@/hooks/api/usePortal';

interface Props {
  label?: string;
  className?: string;
}

export function ManageBillingButton({
  label = 'Manage Billing',
  className,
}: Props) {
  const { trigger, isMutating } = usePortal();

  const handleClick = async () => {
    try {
      const { url } = await trigger();
      window.location.href = url;
    } catch {
      toast.error('Could not open billing portal. Please try again.');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isMutating}
      className={
        className ??
        'border-border text-foreground hover:bg-muted rounded-md border px-6 py-2.5 text-sm font-medium disabled:opacity-50'
      }
    >
      {isMutating ? 'Opening…' : label}
    </button>
  );
}
