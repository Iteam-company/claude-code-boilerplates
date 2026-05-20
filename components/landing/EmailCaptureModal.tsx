'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

const GITHUB_URL = 'https://github.com/Iteam-company/claude-code-boilerplates';

interface Props {
  plan: 'free' | 'pro';
  onClose: () => void;
}

export function EmailCaptureModal({ plan, onClose }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isFree = plan === 'free';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // TODO
    } catch {
      // non-blocking — proceed regardless
    }

    if (isFree) {
      window.open(GITHUB_URL, '_blank');
      onClose();
    } else {
      router.push(ROUTES.CHECKOUT);
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background border-border w-full max-w-sm rounded-lg border p-6 shadow-lg">
        <h2 className="text-foreground text-lg font-semibold">
          {isFree ? 'Get the free boilerplate' : 'Get Pro access'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isFree
            ? "Enter your email and we'll send you the repo link."
            : 'Enter your email to continue to checkout.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border-input text-foreground hover:bg-muted flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !email}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : isFree ? 'Clone for free' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
