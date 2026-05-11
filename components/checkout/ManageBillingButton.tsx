'use client';

import { toast } from 'sonner';
import { usePortal } from '@/hooks/api/usePortal';
import { useTranslations } from 'next-intl';

interface Props {
  label?: string;
  className?: string;
}

export function ManageBillingButton({ label, className }: Props) {
  const t = useTranslations('checkout');
  const { trigger, isMutating } = usePortal();

  const handleClick = async () => {
    try {
      const { url } = await trigger();
      window.location.href = url;
    } catch {
      toast.error(t('portalError'));
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
      {isMutating ? t('opening') : (label ?? t('manageBilling'))}
    </button>
  );
}
