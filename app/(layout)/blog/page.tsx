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

export default async function BlogPage() {
  const posts = await postService.getAll({ published: true });
  return <BlogList posts={posts} />;
}
