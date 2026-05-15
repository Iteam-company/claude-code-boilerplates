interface Props {
  children: React.ReactNode;
}

export function AuthCard({ children }: Props) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
