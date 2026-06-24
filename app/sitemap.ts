import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';
import { postService } from '@/modules/post';
import { getAllDocs } from '@/lib/docs';

function getDocLastModified(slug: string): Date {
  try {
    const filepath = path.join(process.cwd(), 'content/docs', `${slug}.md`);
    return fs.statSync(filepath).mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();
  const posts = await postService.getAll({ published: true });
  const docs = getAllDocs();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const docEntries: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${base}/docs/${doc.slug}`,
    lastModified: getDocLastModified(doc.slug),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${base}/vs/shipfast`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/vs/makerkit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/vs/supastarter`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...postEntries,
    ...docEntries,
  ];
}
