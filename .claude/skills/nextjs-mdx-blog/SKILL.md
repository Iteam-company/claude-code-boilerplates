---
name: nextjs-mdx-blog
description: Set up and maintain a Next.js MDX blog that renders posts stored as MDX strings in a database. Use this skill whenever the user asks about MDX rendering, blog post pages, prose styling, serialize/MDXRemote setup, or gets errors like "async Client Component" or missing prose styles. Always use this skill for anything touching next-mdx-remote, blog layout, or MDX content rendering.
---

# Next.js MDX Blog Skill

Renders MDX strings stored in a database using `next-mdx-remote` (client version).

## Stack

- `next-mdx-remote` — client-side MDX rendering (NOT the `/rsc` version)
- SWR hooks — fetch post data from API
- Server Components — for public blog pages (no hooks needed)

## Critical rules

### Never use `next-mdx-remote/rsc` in a Client Component

The `/rsc` version is Server Component only. Using it inside `'use client'` causes:

```
<MDXRemote> is an async Client Component. Only Server Components can be async.
```

Always import from `next-mdx-remote` (no `/rsc`):

```ts
import { MDXRemote } from 'next-mdx-remote'; // client
import { MDXRemote } from 'next-mdx-remote/rsc'; // server only
```

### MDX must be serialized before rendering

The client `MDXRemote` requires a `MDXRemoteSerializeResult`, not a raw string:

```ts
import { serialize } from 'next-mdx-remote/serialize';

const mdxSource = await serialize(post.content);
// then pass mdxSource to <MDXRemote {...mdxSource} />
```

## Component structure

```
app/blog/
├── page.tsx                    ← Server Component, calls postService directly
└── [slug]/
    └── page.tsx                ← Server Component, no 'use client'

components/
├── BlogPostList.tsx             ← 'use client', uses usePosts hook
├── BlogPost.tsx                 ← 'use client', fetches + serializes
└── BlogPostContent.tsx          ← 'use client', renders MDXRemote
```

Public blog pages are Server Components — they call `postService` directly for best performance and SEO. Hooks are only used when client interactivity is needed.
