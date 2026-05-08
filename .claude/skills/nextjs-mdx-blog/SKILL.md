---
name: nextjs-mdx-blog
description: Set up a Next.js MDX blog. Covers both file-based (@next/mdx with content/ folder) and DB-based (next-mdx-remote) approaches, including prose styling, mdx-components.tsx, remark-gfm tables, and Turbopack gotchas. Use this skill whenever the user asks about MDX rendering, blog post pages, prose styling, or gets errors like "loader does not have serializable options" or "async Client Component".
---

# Next.js MDX Blog Skill

Two approaches — **always ask which one the user wants before scaffolding**.

---

## Option A — File-based (`@next/mdx`)

Posts are `.mdx` files in `content/blog/`. Discovered at build time via `lib/blog.ts`. No database needed.

### Install

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm @tailwindcss/typography
```

### `next.config.ts`

Pass remark plugins as **string tuples**, not function references — required for webpack loader serialization:

```ts
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm', {}]],
    rehypePlugins: [],
  },
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);
```

### CRITICAL: disable Turbopack for dev

Turbopack cannot serialize function references in webpack loader options. Add `--no-turbopack` to the dev script:

```json
"dev": "next dev --no-turbopack"
```

If you see this error, it means Turbopack is active:

```
loader does not have serializable options. Ensure that options passed are plain JavaScript objects.
```

### `mdx-components.tsx` (repo root)

Required by `@next/mdx`. Exports `useMDXComponents` — called automatically by the runtime, never manually. Use CSS variables for all colors:

```tsx
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-foreground mt-8 mb-4 text-3xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-foreground mt-8 mb-3 text-2xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-foreground mt-6 mb-2 text-xl font-semibold">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-foreground/90 my-4 leading-7">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? '#'}
        className="text-foreground font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="text-foreground/90 my-4 ml-6 list-disc space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-foreground/90 my-4 ml-6 list-decimal space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="text-muted-foreground border-border my-4 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted border-border my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-relaxed">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-border my-8" />,
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto">
        <table className="border-border w-full border-collapse text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-border border-b">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-border border-b last:border-0">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="text-foreground px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="text-foreground/90 px-4 py-2">{children}</td>
    ),
    ...components,
  };
}
```

### Frontmatter — JS exports only

Use JS-exported frontmatter, **not YAML `---` blocks**. YAML requires `remark-frontmatter` which also triggers the Turbopack serialization error:

```mdx
export const frontmatter = {
  title: 'My Post',
  date: '2025-05-01',
  description: 'A short description.',
  tags: ['nextjs', 'mdx'],
  author: 'Admin',
};

Post content starts here...
```

### `lib/blog.ts`

Reads MDX files as strings and regex-parses the JS-exported frontmatter. No `gray-matter` needed:

```ts
import fs from 'fs';
import path from 'path';

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatterExport(source: string): PostFrontmatter {
  const str = (key: string) =>
    source.match(new RegExp(`${key}:\\s*['"\`](.*?)['"\`]`))?.[1] ?? '';
  const tagsMatch = source.match(/tags:\s*\[([^\]]*)\]/);
  const tags = tagsMatch
    ? [...tagsMatch[1].matchAll(/['"`](.*?)['"`]/g)].map((m) => m[1])
    : [];
  return {
    title: str('title'),
    date: str('date'),
    description: str('description'),
    author: str('author'),
    tags,
  };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      return { slug, ...parseFrontmatterExport(source) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function slugExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`));
}
```

### `app/(layout)/blog/[slug]/page.tsx`

Dynamic import gives both the component and the `frontmatter` named export in one call:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { Container } from '@/components/Container';
import { getAllPosts, slugExists } from '@/lib/blog';
import type { PostFrontmatter } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

type MDXModule = {
  default: React.ComponentType;
  frontmatter: PostFrontmatter;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slugExists(slug)) return { title: 'Post not found' };
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as MDXModule;
  return {
    title: mod.frontmatter.title,
    description: mod.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!slugExists(slug)) notFound();

  const { default: PostContent, frontmatter } = (await import(
    `@/content/blog/${slug}.mdx`
  )) as MDXModule;

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          ← All posts
        </Link>
        <header className="mb-10">
          <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {frontmatter.title}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
            <span>{frontmatter.author}</span>
            <span>·</span>
            <time dateTime={frontmatter.date}>
              {format(parseISO(frontmatter.date), 'MMMM d, yyyy')}
            </time>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <PostContent />
        </article>
      </div>
    </Container>
  );
}
```

### `tsconfig.json`

Add `**/*.mdx` to the `include` array so TypeScript knows about MDX files.

---

## Option B — DB-based (`next-mdx-remote`)

Posts are MDX strings stored in the database `content` column. Useful when posts are user-created or CMS-managed.

### Install

```bash
npm install next-mdx-remote @tailwindcss/typography
```

### Critical rules

**Never use `next-mdx-remote/rsc` in a Client Component.** It is Server Component only:

```ts
import { MDXRemote } from 'next-mdx-remote'; // client ✓
import { MDXRemote } from 'next-mdx-remote/rsc'; // server only ✗ in client
```

**Serialize in `useEffect`, not during render:**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export function BlogPostContent({ content }: { content: string }) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );

  useEffect(() => {
    serialize(content).then(setMdxSource);
  }, [content]);

  if (!mdxSource)
    return <div className="bg-muted h-64 animate-pulse rounded" />;

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} />
    </div>
  );
}
```

Public blog pages are Server Components — call `postService` directly, no hooks needed.

---

## Styling (both approaches)

### `app/globals.css`

```css
@plugin '@tailwindcss/typography';
```

(Tailwind v4 syntax — add before `:root`)

### Prose wrapper

Always wrap rendered MDX in:

```tsx
<article className="prose prose-neutral dark:prose-invert max-w-none">
  {/* MDX content */}
</article>
```

### CSS variable conventions for custom components

| Purpose                | Class                   |
| ---------------------- | ----------------------- |
| Primary text           | `text-foreground`       |
| Secondary / muted text | `text-muted-foreground` |
| Subtle backgrounds     | `bg-muted`              |
| Borders                | `border-border`         |

Never use hardcoded hex values — always use CSS variables so dark/light mode works automatically.
