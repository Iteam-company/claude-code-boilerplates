export const fetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'Something went wrong');
  }

  return res.json();
};

export const poster = <TArg, TResponse>(url: string, { arg }: { arg: TArg }) =>
  fetcher<TResponse>(url, { method: 'POST', body: JSON.stringify(arg) });
