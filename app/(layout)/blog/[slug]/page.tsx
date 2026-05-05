import { notFound } from 'next/navigation';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Post, metadata;
  try {
    const mod = await import(`@/content/${slug}.mdx`);
    Post = mod.default;
    metadata = mod.metadata;
  } catch {
    notFound();
  }

  return (
    <article className="prose mx-auto max-w-2xl px-4 py-4">
      <p className="text-sm text-gray-500">{metadata?.date}</p>
      <Post />
    </article>
  );
}
