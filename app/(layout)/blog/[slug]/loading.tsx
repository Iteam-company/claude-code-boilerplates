export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="bg-muted mb-4 h-8 w-3/4 animate-pulse rounded" />
      <div className="bg-muted mb-8 h-4 w-1/3 animate-pulse rounded" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted h-4 animate-pulse rounded"
            style={{ width: `${85 + (i % 3) * 5}%` }}
          />
        ))}
      </div>
    </div>
  );
}
