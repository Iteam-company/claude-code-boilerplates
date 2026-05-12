import useSWRMutation from 'swr/mutation';

async function triggerPortal(_url: string) {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const res = await fetch('/api/stripe/portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Failed to open portal');
  return data as { url: string };
}

export function usePortal() {
  return useSWRMutation('/api/stripe/portal', triggerPortal);
}
