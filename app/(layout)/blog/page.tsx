import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on development, design, and building software.',
  openGraph: {
    title: 'Blog | Claude Code Boilerplate',
    description: 'Thoughts on development, design, and building software.',
    url: '/blog',
  },
  twitter: {
    title: 'Blog | Claude Code Boilerplate',
    description: 'Thoughts on development, design, and building software.',
  },
};

export default function BlogPage() {
  return <BlogList />;
}
