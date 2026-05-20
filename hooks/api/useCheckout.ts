import useSWRMutation from 'swr/mutation';

interface CheckoutPayload {
  priceId: string;
  mode?: 'payment' | 'subscription';
  quantity?: number;
  customer_email?: string;
}

async function triggerCheckout(
  _url: string,
  { arg }: { arg: CheckoutPayload },
) {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
  return data as { url: string };
}

export function useCheckout() {
  return useSWRMutation('/api/stripe/checkout', triggerCheckout);
}
