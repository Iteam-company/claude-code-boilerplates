interface Props {
  isFree: boolean;
  onClose: () => void;
}

export function SuccessStep({ isFree, onClose }: Props) {
  if (isFree) {
    return (
      <div className="text-center">
        <div className="text-3xl">🎉</div>
        <h2 className="text-foreground mt-3 text-lg font-semibold">
          Check your inbox
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We sent you an email with the link to the repository.
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

  return (
    <div className="text-center">
      <div className="text-3xl">✅</div>
      <h2 className="text-foreground mt-3 text-lg font-semibold">
        You&apos;re in
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        We sent you an invite to the repository. Check your GitHub
        notifications.
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
