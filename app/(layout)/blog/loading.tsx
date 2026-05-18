export default function BlogListLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="bg-muted mb-8 h-8 w-32 animate-pulse rounded" />
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-muted h-6 w-2/3 animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-1/4 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
