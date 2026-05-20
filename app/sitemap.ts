import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';
import { postService } from '@/modules/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const posts = await postService.getAll({ published: true });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: base, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.8 },
    ...postEntries,
  ];
}
