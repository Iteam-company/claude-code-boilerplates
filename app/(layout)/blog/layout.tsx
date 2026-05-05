export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose prose-neutral dark:prose-invert mx-auto max-w-2xl px-4 py-4">
      {children}
    </div>
  );
}
