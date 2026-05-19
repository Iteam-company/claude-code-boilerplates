import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';
import { postService } from '@/modules/post';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical guides on Next.js, Drizzle ORM, Claude Code, and building full-stack SaaS products.',
  openGraph: {
    title: 'Blog | Claude Code Boilerplate',
    description:
      'Practical guides on Next.js, Drizzle ORM, Claude Code, and building full-stack SaaS products.',
    url: '/blog',
  },
  twitter: {
    title: 'Blog | Claude Code Boilerplate',
    description:
      'Practical guides on Next.js, Drizzle ORM, Claude Code, and building full-stack SaaS products.',
  },
};

interface Props {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam, q } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
  const query = q?.trim() || undefined;
  const { posts, total, totalPages } = await postService.getPaginated(
    { published: true, query },
    page,
  );
  return (
    <BlogList
      posts={posts}
      total={total}
      page={page}
      totalPages={totalPages}
      query={query}
    />
  );
}
