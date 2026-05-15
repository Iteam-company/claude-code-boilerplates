'use client';
import { useState } from 'react';

interface Props {
  orgName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CONFIRM_PHRASE = 'delete my organization';

export function DeleteOrgDialog({
  orgName,
  isDeleting,
  onConfirm,
  onClose,
}: Props) {
  const [nameInput, setNameInput] = useState('');
  const [phraseInput, setPhraseInput] = useState('');

  const isValid = nameInput === orgName && phraseInput === CONFIRM_PHRASE;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background border-border w-full max-w-md rounded-lg border p-6 shadow-lg">
        <h2 className="text-foreground mb-1 text-lg font-semibold">
          Delete organization
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          This action is permanent and cannot be undone. All members and data
          will be lost.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Enter the organization name &quot;
              <span className="font-mono font-semibold">{orgName}</span>&quot;
              to confirm
            </label>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              autoComplete="off"
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Type &quot;
              <span className="font-mono font-semibold">{CONFIRM_PHRASE}</span>
              &quot; to confirm
            </label>
            <input
              value={phraseInput}
              onChange={(e) => setPhraseInput(e.target.value)}
              autoComplete="off"
              className="bg-background w-full rounded-md border border-red-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200 dark:border-red-600 dark:text-red-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="border-input text-foreground hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isValid || isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-600"
          >
            {isDeleting ? 'Deleting…' : 'Delete organization'}
          </button>
        </div>
      </div>
    </div>
  );
}
