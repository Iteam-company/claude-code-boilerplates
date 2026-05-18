import type { Metadata } from 'next';
import { BlogPost } from '@/components/blog/BlogPost';
import { postService } from '@/modules/post';

interface Props {
  params: Promise<{ slug: string }>;
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
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

  let jsonLd = null;
  try {
    const post = await postService.getBySlug(slug);
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.createdAt.toISOString(),
      dateModified: post.updatedAt.toISOString(),
      url: `${getBaseUrl()}/blog/${slug}`,
    };
  } catch {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPost slug={slug} />
    </>
  );
}
