---
name: seo
description: Full SEO layer for this Next.js project — root layout metadata, page-level static/dynamic metadata, OG images (static + dynamic), sitemap.ts, robots.ts, JSON-LD structured data, canonical URLs, Twitter cards, and comparison/vs pages. Use this skill whenever the user asks about SEO, metadata, open graph, OG image, sitemap, robots.txt, JSON-LD, structured data, canonical URLs, Twitter cards, or adding a competitor comparison page.
---

# SEO Skill

This project has a complete SEO layer: metadata in the root layout, per-page static and dynamic metadata, two OG image patterns, a dynamic sitemap, robots.txt, JSON-LD structured data, and SEO-optimised competitor comparison pages.

---

## Root layout metadata — `app/layout.tsx`

Sets the baseline for every page. Required fields:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()), // required — makes relative OG URLs absolute
  title: {
    default: 'Site Name',
    template: '%s | Site Name', // child pages set only title, get this template applied
  },
  description: 'Default description.',
  keywords: ['keyword one', 'keyword two'],
  openGraph: {
    type: 'website',
    url: getBaseUrl(),
    locale: 'en_US',
    siteName: 'Site Name',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};
```

`metadataBase` is mandatory — without it, relative `/opengraph-image` URLs silently break in OG previews.

---

## Page-level metadata

### Static

```ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title', // template applied → "Page Title | Site Name"
  description: 'Page description.',
  alternates: { canonical: '/page-path' },
};
```

### Dynamic (`generateMetadata`)

Used when the title/description depends on fetched data (blog posts, docs pages, etc.):

```ts
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await postService.getBySlug(slug);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ['Your Site Name'],
      images: [{ url: `/api/og/blog/${slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/api/og/blog/${slug}`],
    },
  };
}
```

Always set `alternates.canonical` on content pages to prevent duplicate-URL penalties.

---

## OG images

### Static root — `app/opengraph-image.tsx`

Default export, no data fetching. Use `runtime = 'edge'` for fastest CDN delivery.

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Site Name';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#0f172a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <div style={{ color: '#ffffff', fontSize: 72, fontWeight: 700 }}>
        Site Name
      </div>
      <div style={{ color: '#94a3b8', fontSize: 26, marginTop: 24 }}>
        Your tagline here
      </div>
    </div>,
    { ...size },
  );
}
```

### Dynamic with data — `app/api/og/blog/[slug]/route.tsx`

Use `runtime = 'nodejs'` when the handler needs to query the database.

```tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { postService } from '@/modules/post';
import { getBaseUrl } from '@/lib/utils';

export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  let title = slug;
  try {
    const post = await postService.getBySlug(slug);
    title = post.title;
  } catch {}

  return new ImageResponse(
    <div
      style={{
        background: '#0f172a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 80,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ color: '#94a3b8', fontSize: 20 }}>Site Name</div>
      <div
        style={{
          color: '#f8fafc',
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div style={{ color: '#475569', fontSize: 18 }}>
        {`${getBaseUrl()}/blog/${slug}`}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
```

**Key rules for `ImageResponse`:**

- No Tailwind — use inline `style={{}}` only
- No custom fonts unless loaded manually via `fetch` + `ArrayBuffer`
- `runtime = 'edge'` for static content (faster); `runtime = 'nodejs'` when you need DB/filesystem
- Always 1200×630 pixels

### Adding OG for a new page

- **Static** (no data): create `app/(section)/page-name/opengraph-image.tsx` (same pattern as root)
- **Dynamic** (needs data): create `app/api/og/[resource]/route.tsx` and reference in `generateMetadata`:
  ```ts
  openGraph: {
    images: [{ url: `/api/og/resource/${id}`, width: 1200, height: 630 }];
  }
  ```

---

## Sitemap — `app/sitemap.ts`

Served automatically at `/sitemap.xml`.

```ts
import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';
import { postService } from '@/modules/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const posts = await postService.getAll({ published: true });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: base, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.8 },
    // add static pages here
    ...postEntries,
    // spread other dynamic entries here
  ];
}
```

To add new dynamic segments (docs, products, etc.): fetch items from DB, map to entries, spread into the return array.

---

## Robots — `app/robots.ts`

```ts
import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard',
        '/organizations',
        '/signin',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/verify-email',
        '/accept-invite',
      ],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
```

Always disallow `/api/` and all authenticated app routes. Always include the `sitemap` field.

---

## JSON-LD structured data

Inject inline as a `<script>` tag in server components. Never fetch data inside JSON-LD — use data already loaded for the page render.

### BlogPosting (blog post pages)

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: post.createdAt.toISOString(),
  dateModified: post.updatedAt.toISOString(),
  url: `${base}/blog/${slug}`,
  image: {
    '@type': 'ImageObject',
    url: `${base}/api/og/blog/${slug}`,
    width: 1200,
    height: 630,
  },
  author: { '@type': 'Organization', name: 'Site Name', url: base },
  publisher: { '@type': 'Organization', name: 'Site Name', url: base },
};

// in JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>;
```

### BreadcrumbList (any page with navigation hierarchy)

```tsx
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: base },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${base}/blog` },
    {
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: `${base}/blog/${slug}`,
    },
  ],
};
```

---

## Comparison / vs pages — `app/(layout)/vs/[competitor]/page.tsx`

SEO landing pages targeting "[Competitor] alternative" search queries.

```ts
const COMPETITORS: Record<string, CompetitorData> = {
  shipfast: {
    name: 'ShipFast',
    price: '$199',
    headline: 'ShipFast is $199. This is free.',
    subheading: '...',
    metaTitle: 'ShipFast Alternative -- Free Next.js SaaS Boilerplate',
    metaDescription: '...',
  },
  // add more competitors here
};
```

Key patterns:

- `generateStaticParams` — returns `Object.keys(COMPETITORS)` for SSG
- `generateMetadata` uses `title: { absolute: data.metaTitle }` to bypass the `template` and write the full title directly
- Each page includes `BreadcrumbList` JSON-LD
- Cross-link to sibling vs pages via the `OTHERS` map for internal linking

**Adding a new competitor:**

1. Add entry to `COMPETITORS` with all fields
2. Add cross-links to `OTHERS` for the new and related competitors
3. Add the URL to `app/sitemap.ts`

---

## ISR for dynamic pages

```ts
export const revalidate = 3600; // regenerate at most once per hour
export const dynamicParams = true; // serve slugs not in generateStaticParams on first request
```

Use on blog post pages and any dynamic content page.

---

## Conventions

- Always set `metadataBase` in root layout — required for relative OG image URLs
- Always use `getBaseUrl()` from `lib/utils.ts` — never hardcode the domain
- Set `alternates.canonical` on all content pages (blog posts, docs, vs pages)
- Every page must export a unique `title` and `description`
- Use `title: { absolute: '...' }` on comparison pages to override the global `template`
- Disallow all `/api/` routes and authenticated app routes in `robots.ts`
