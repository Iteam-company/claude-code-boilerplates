---
name: swr-hooks
description: Generate SWR data-fetching hooks (useSWR and useSWRMutation) following the project's fetcher pattern. Use this skill whenever the user asks to add a hook, create a useX function, fetch data from the API in a component, or needs client-side data fetching. Triggers on "add a hook for", "I need to fetch X", "create a mutation hook", or any request that implies a new hooks/api/*.ts file.
---

# SWR Hooks Skill

Generates typed SWR hooks that follow the project's fetcher pattern.

## Fetcher utilities (`lib/fetcher.ts`)

All hooks rely on these four helpers:

```ts
export const fetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.error ?? 'Something went wrong');
  }
  return res.json();
};

export const poster = <TArg, TResponse>(url: string, { arg }: { arg: TArg }) =>
  fetcher<TResponse>(url, { method: 'POST', body: JSON.stringify(arg) });

export const putter = <TArg, TResponse>(url: string, { arg }: { arg: TArg }) =>
  fetcher<TResponse>(url, { method: 'PUT', body: JSON.stringify(arg) });

export const deleter = (url: string) =>
  fetcher<void>(url, { method: 'DELETE' });
```

## Patterns

### Read hook (useSWR)

```ts
export const use[Resource] = (id: string) => {
  return useSWR<ResourceType>(
    id ? `/api/resources/${id}` : null, // null = don't fetch yet
    fetcher,
  )
}
```

### Protected GET (with auth token)

The default `fetcher` has no Authorization header. For protected GET endpoints, pass it inline:

```ts
export const useMyPosts = () => {
  return useSWR<Post[]>('/api/posts?self=true', (url) =>
    fetcher(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
  );
};
```

### Create hook (useSWRMutation)

```ts
export const useCreate[Resource] = () => {
  return useSWRMutation<ResourceType, Error, string, Create[Resource]SchemaType>(
    '/api/resources',
    poster<Create[Resource]SchemaType, ResourceType>,
  )
}
```

### Update hook (useSWRMutation)

```ts
export const useUpdate[Resource] = (id: string) => {
  return useSWRMutation<ResourceType, Error, string, Update[Resource]SchemaType>(
    `/api/resources/${id}`,
    putter<Update[Resource]SchemaType, ResourceType>,
  )
}
```

### Delete hook (useSWRMutation)

```ts
export const useDelete[Resource] = (id: string) => {
  return useSWRMutation<void, Error, string>(
    `/api/resources/${id}`,
    deleter,
  )
}
```

### Mutation with cache invalidation (onSuccess → mutate)

When a mutation should refresh a related list:

```ts
export const useCreate[Resource] = (parentId: string) => {
  const { mutate } = use[Resources](parentId) // read hook for the list

  return useSWRMutation<ResourceType, Error, string, Create[Resource]SchemaType>(
    `/api/parent/${parentId}/resources`,
    poster<Create[Resource]SchemaType, ResourceType>,
    {
      onSuccess: () => mutate(), // refetch list after create
    },
  )
}
```

## URL building

For hooks with optional query params, use `URLSearchParams`:

```ts
export const use[Resources] = (options: { self?: boolean } = {}) => {
  const params = new URLSearchParams()
  if (options.self) params.set('self', 'true')

  const query = params.toString()
  const url = query ? `/api/resources?${query}` : '/api/resources'

  return useSWR<ResourceType[]>(url, fetcher)
}
```

## File uploads (manual fetch — not poster)

File uploads use `FormData` so they can't use the `poster` helper:

```ts
export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
        // Do NOT set Content-Type — browser sets it with boundary automatically
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Upload failed');
      }

      const data: { url: string } = await res.json();
      return data.url;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading, error };
};
```

## Rules

- Hooks live in `hooks/api/[name].ts`
- Always pass `null` as the key when a required param is missing (prevents fetch)
- Use `fetcher` for GET, `poster`/`putter`/`deleter` for mutations
- Always type all 4 generics on `useSWRMutation<TData, TError, TKey, TArg>`
- Call `mutate()` in `onSuccess` when a mutation should refresh related data
- Never use hooks in Server Components — call service directly instead
- Never set `Content-Type` manually for `FormData` uploads

## Usage in components

```tsx
'use client';

// Read
const { data, isLoading, error } = usePosts();

// Mutate
const { trigger, isMutating } = useCreatePost();
await trigger({ title: '...', content: '...' });

// Upload
const { upload, isLoading } = useUpload();
const url = await upload(file);
```

## Barrel export

```ts
// hooks/api/index.ts
export * from './post';
export * from './comment';
export * from './like';
export * from './upload';
```
