interface Props {
  onClose: () => void;
}

export function DuplicateStep({ onClose }: Props) {
  return (
    <div className="text-center">
      <div className="text-3xl">👋</div>
      <h2 className="text-foreground mt-3 text-lg font-semibold">
        You&apos;re already registered
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        This email is already on the list. Check your inbox for updates.
      </p>
      <button
        onClick={onClose}
        className="border-input text-foreground hover:bg-muted mt-5 w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors"
      >
        Got it
      </button>
    </div>
  );
}
