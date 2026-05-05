import { notFound } from 'next/navigation';
import { postService } from '@/modules/post';
import { BlogPostContent } from './blog-post-content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = await postService.getBySlug(slug);
    return { title: post.title, description: post.description };
  } catch {
    return {};
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

  return <BlogPostContent post={post} />;
}
