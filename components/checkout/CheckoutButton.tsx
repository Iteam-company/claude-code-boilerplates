'use client';

import { toast } from 'sonner';
import { useCheckout } from '@/hooks/api/useCheckout';
import { useTranslations } from 'next-intl';

interface Props {
  priceId: string;
  mode?: 'payment' | 'subscription';
  label?: string;
  className?: string;
}

export function CheckoutButton({
  priceId,
  mode = 'payment',
  label,
  className,
}: Props) {
  const t = useTranslations('checkout');
  const { trigger, isMutating } = useCheckout();

  const handleClick = async () => {
    try {
      const { url } = await trigger({ priceId, mode });
      window.location.href = url;
    } catch {
      toast.error(t('checkoutError'));
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isMutating}
      className={
        className ??
        'bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2.5 text-sm font-medium disabled:opacity-50'
      }
    >
      {isMutating ? t('redirecting') : (label ?? t('buyNow'))}
    </button>
  );
}
