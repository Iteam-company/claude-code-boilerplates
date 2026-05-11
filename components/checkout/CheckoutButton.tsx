'use client';

import { toast } from 'sonner';
import { useCheckout } from '@/hooks/api/useCheckout';

interface Props {
  priceId: string;
  mode?: 'payment' | 'subscription';
  label?: string;
  className?: string;
}

export function CheckoutButton({
  priceId,
  mode = 'payment',
  label = 'Buy Now',
  className,
}: Props) {
  const { trigger, isMutating } = useCheckout();

  const handleClick = async () => {
    try {
      const { url } = await trigger({ priceId, mode });
      window.location.href = url;
    } catch {
      toast.error('Could not start checkout. Please try again.');
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
      {isMutating ? 'Redirecting…' : label}
    </button>
  );
}
