import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDocs, getDoc } from '@/lib/docs';
import { markdownToHtml } from '@/lib/markdown';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: slug };
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${slug}` },
  };
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const html = await markdownToHtml(doc.content);
  const docs = getAllDocs();
  const sectionDocs = docs.filter((d) => d.section === doc.section);
  const currentIndex = sectionDocs.findIndex((d) => d.slug === slug);
  const prevDoc = sectionDocs[currentIndex - 1] ?? null;
  const nextDoc = sectionDocs[currentIndex + 1] ?? null;

  return (
    <>
      <article
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {(prevDoc || nextDoc) && (
        <nav
          aria-label="Document navigation"
          className="border-border mt-12 flex justify-between gap-4 border-t pt-8"
        >
          {prevDoc ? (
            <Link
              href={`/docs/${prevDoc.slug}`}
              aria-label={`Previous: ${prevDoc.title}`}
              className="border-border bg-card hover:bg-muted inline-flex flex-col rounded-lg border px-6 py-4 transition-colors"
            >
              <span className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
                <span aria-hidden="true">← </span>Back
              </span>
              <span className="text-foreground font-semibold">
                {prevDoc.title}
              </span>
              {prevDoc.description && (
                <span className="text-muted-foreground mt-0.5 text-sm">
                  {prevDoc.description}
                </span>
              )}
            </Link>
          ) : (
            <div />
          )}
          {nextDoc && (
            <Link
              href={`/docs/${nextDoc.slug}`}
              aria-label={`Next: ${nextDoc.title}`}
              className="border-border bg-card hover:bg-muted inline-flex flex-col items-end rounded-lg border px-6 py-4 transition-colors"
            >
              <span className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
                Next <span aria-hidden="true"> →</span>
              </span>
              <span className="text-foreground font-semibold">
                {nextDoc.title}
              </span>
              {nextDoc.description && (
                <span className="text-muted-foreground mt-0.5 text-sm">
                  {nextDoc.description}
                </span>
              )}
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
