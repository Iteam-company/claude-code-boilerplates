import { getAllDocs } from '@/lib/docs';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Container } from '@/components/Container';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();

  return (
    <Container className="py-12">
      <div className="flex gap-12">
        <DocsSidebar docs={docs} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Container>
  );
}
