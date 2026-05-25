import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/components/blog/BlogPost';
import { postService } from '@/modules/post';
import { getBaseUrl } from '@/lib/utils';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await postService.getAll();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

function truncate(str: string, max: number) {
  return str.length <= max ? str : str.slice(0, max - 1).trimEnd() + '…';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await postService.getBySlug(slug);
    const title = truncate(post.title, 60);
    const description = truncate(post.description, 160);
    return {
      title: { absolute: title },
      description,
      alternates: {
        canonical: `/blog/${slug}`,
        languages: { en: `/blog/${slug}`, 'x-default': `/blog/${slug}` },
      },
      openGraph: {
        title,
        description,
        url: `/blog/${slug}`,
        type: 'article',
        siteName: 'Claude Code Boilerplate',
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: ['Claude Code Boilerplate'],
        images: [{ url: `/api/og/blog/${slug}`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/api/og/blog/${slug}`],
      },
      other: {
        'og:logo': `${getBaseUrl()}/opengraph-image`,
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
      url: `${base}/api/og/blog/${slug}`,
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
