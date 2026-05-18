import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';

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

export default function BlogPage() {
  return <BlogList />;
}
