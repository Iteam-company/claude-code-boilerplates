import type { Metadata } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Container } from '@/components/Container';
import { getAllPosts } from '@/lib/blog';

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

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container className="py-16">
      <div className="mb-12">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Blog{' '}
          <span className="text-muted-foreground text-lg font-normal">
            {posts.length} posts
          </span>
        </h1>
      </div>

      <ol className="space-y-0">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className="border-border border-t py-8 first:border-t-0"
          >
            <div className="flex gap-6">
              <span className="text-muted-foreground mt-0.5 w-6 shrink-0 font-mono text-sm tabular-nums">
                {String(index + 1).padStart(2, '0')}.
              </span>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-foreground hover:text-muted-foreground text-lg font-semibold transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="text-muted-foreground text-sm">
                    {format(parseISO(post.date), 'MMM d, yyyy')}
                  </span>
                </div>

                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
