type Headers = Record<string, string>;
type MutationArg<TArg> = { arg: TArg };

interface ApiError {
  error?: string;
  message?: string;
}

const createApi = (getHeaders: () => Headers) => {
  const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(),
        ...(options?.headers as Headers),
      },
    });

    if (!res.ok) {
      const err: ApiError = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      throw new Error(err.error ?? err.message ?? 'Something went wrong');
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  };

  return {
    get: <T>(url: string, options?: RequestInit) => request<T>(url, options),
    post: <TArg, TRes>(url: string, { arg }: MutationArg<TArg>) =>
      request<TRes>(url, { method: 'POST', body: JSON.stringify(arg) }),
    put: <TArg, TRes>(url: string, { arg }: MutationArg<TArg>) =>
      request<TRes>(url, { method: 'PUT', body: JSON.stringify(arg) }),
    delete: (url: string) => request<void>(url, { method: 'DELETE' }),
  };
};

export const api = createApi(() => ({}));

/** Cookies are sent automatically — alias of api */
export const authApi = api;
