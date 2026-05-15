interface Props {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function QuickLink({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-card border-border hover:bg-muted flex items-center gap-3 rounded-lg border p-4 text-left transition-colors"
    >
      <span className="text-primary">{icon}</span>
      <span className="text-foreground text-sm font-medium">{label}</span>
    </button>
  );
}
