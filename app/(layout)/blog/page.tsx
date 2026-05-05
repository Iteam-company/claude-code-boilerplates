import Link from 'next/link';
import { postService } from '@/modules/post';

export default async function BlogIndexPage() {
  const posts = await postService.getAll();

  if (!posts.length) {
    return <p className="text-gray-500">No posts yet.</p>;
  }

  return (
    <main>
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
