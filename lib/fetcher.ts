type Headers = Record<string, string>;
type MutationArg<TArg> = { arg: TArg };

interface ApiError {
  error?: string;
  message?: string;
}

const AUTH_KEYS: [storageKey: string, header: string, prefix?: string][] = [
  ['auth_token', 'Authorization', 'Bearer'],
];

const getAuthHeaders = (): Headers => {
  if (typeof window === 'undefined') return {};
  return Object.fromEntries(
    AUTH_KEYS.flatMap(([storageKey, header, prefix]) => {
      const value = localStorage.getItem(storageKey);
      return value ? [[header, prefix ? `${prefix} ${value}` : value]] : [];
    }),
  );
};

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

/** Unauthenticated API client */
export const api = createApi(() => ({}));

/** Authenticated API client — reads auth_token from localStorage */
export const authApi = createApi(getAuthHeaders);
