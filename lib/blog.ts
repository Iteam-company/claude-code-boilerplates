import fs from 'fs';
import path from 'path';

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatterExport(source: string): PostFrontmatter {
  const str = (key: string) =>
    source.match(new RegExp(`${key}:\\s*['"\`](.*?)['"\`]`))?.[1] ?? '';
  const tagsMatch = source.match(/tags:\s*\[([^\]]*)\]/);
  const tags = tagsMatch
    ? [...tagsMatch[1].matchAll(/['"`](.*?)['"`]/g)].map((m) => m[1])
    : [];
  return {
    title: str('title'),
    date: str('date'),
    description: str('description'),
    author: str('author'),
    tags,
  };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      return { slug, ...parseFrontmatterExport(source) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function slugExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`));
}
