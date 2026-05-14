const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const headers: Record<string, string> = {};
  const token = localStorage.getItem('auth_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const orgId = localStorage.getItem('current_org_id');
  if (orgId) headers['X-Org-Id'] = orgId;
  return headers;
};

export const fetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.error ?? 'Something went wrong');
  }

  if (res.status === 204) return undefined as T;
  return res.json();
};

export const poster = <TArg, TResponse>(url: string, { arg }: { arg: TArg }) =>
  fetcher<TResponse>(url, { method: 'POST', body: JSON.stringify(arg) });

export const authFetcher = <T>(
  url: string,
  options?: RequestInit,
): Promise<T> =>
  fetcher<T>(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options?.headers as Record<string, string>),
    },
  });

export const authPoster = <TArg, TResponse>(
  url: string,
  { arg }: { arg: TArg },
) => authFetcher<TResponse>(url, { method: 'POST', body: JSON.stringify(arg) });

export const authPutter = <TArg, TResponse>(
  url: string,
  { arg }: { arg: TArg },
) => authFetcher<TResponse>(url, { method: 'PUT', body: JSON.stringify(arg) });
