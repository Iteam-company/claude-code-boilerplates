import fs from 'fs';
import path from 'path';
import Link from 'next/link';

async function getPosts() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = path.basename(file, '.mdx');
      const mod = await import(`@/content/${slug}.mdx`);
      return { slug, ...mod.metadata };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:underline">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">{post.date}</p>
              <p className="text-gray-700">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
