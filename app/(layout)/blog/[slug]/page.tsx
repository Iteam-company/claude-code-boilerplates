import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/components/blog/BlogPost';
import { postService } from '@/modules/post';
import { getBaseUrl } from '@/lib/utils';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await postService.getBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `/blog/${slug}`,
        type: 'article',
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
      },
      twitter: {
        title: post.title,
        description: post.description,
      },
    };
  } catch {
    return { title: slug };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await postService.getBySlug(slug);
  } catch {
    notFound();
  }

  const base = getBaseUrl();
  const org = {
    '@type': 'Organization',
    name: 'Claude Code Boilerplate',
    url: base,
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post!.title,
    description: post!.description,
    datePublished: post!.createdAt.toISOString(),
    dateModified: post!.updatedAt.toISOString(),
    url: `${base}/blog/${slug}`,
    author: org,
    publisher: org,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost post={post!} />
    </>
  );
}
