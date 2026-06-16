import { permanentRedirect } from 'next/navigation';
import { getAllDocs } from '@/lib/docs';

export default function DocsIndexPage() {
  const docs = getAllDocs();
  if (docs.length > 0) {
    permanentRedirect(`/docs/${docs[0].slug}`);
  }
  return null;
}
