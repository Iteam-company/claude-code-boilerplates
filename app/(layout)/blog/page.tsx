import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';
import { postService } from '@/modules/post';

export const revalidate = 3600;

const BLOG_TITLE = 'Blog | Claude Code Boilerplate';
const BLOG_DESCRIPTION =
  'Practical guides on Next.js, Drizzle ORM, Claude Code, and building full-stack SaaS products.';

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_DESCRIPTION,
  keywords: [
    'next.js tutorials',
    'claude code guides',
    'drizzle orm',
    'saas development',
    'stripe integration',
    'nextjs app router',
    'full-stack typescript',
  ],
  alternates: {
    canonical: '/blog',
    languages: { en: '/blog', 'x-default': '/blog' },
  },
  openGraph: {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: '/blog',
    type: 'website',
    siteName: 'Claude Code Boilerplate',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

interface Props {
  searchParams: Promise<{ page?: string; q?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam, q, tag } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const query = q?.trim() || undefined;
  const activeTag = tag?.trim() || undefined;

  const [{ posts, total, totalPages }, allTags] = await Promise.all([
    postService.getPaginated({ published: true, query, tag: activeTag }, page),
    postService.getTags(),
  ]);

  return (
    <BlogList
      posts={posts}
      total={total}
      page={page}
      totalPages={totalPages}
      query={query}
      allTags={allTags}
      activeTag={activeTag}
    />
  );
}
