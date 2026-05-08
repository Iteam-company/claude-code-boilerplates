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
