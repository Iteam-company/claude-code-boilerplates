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
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `/blog/${slug}`,
        type: 'article',
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: ['Claude Code Boilerplate'],
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
    image: {
      '@type': 'ImageObject',
      url: `${base}/blog/${slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: org,
    publisher: org,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${base}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post!.title,
        item: `${base}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogPost post={post!} />
    </>
  );
}
