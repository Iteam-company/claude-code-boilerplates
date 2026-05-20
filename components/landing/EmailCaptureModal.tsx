'use client';

import { useState } from 'react';

const PRICE_ID =
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? 'price_REPLACE_ME';

interface Props {
  plan: 'free' | 'pro';
  onClose: () => void;
}

export function EmailCaptureModal({ plan, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const isFree = plan === 'free';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      if (isFree) {
        // TODO: handle free plan email capture (e.g. save to waitlist, send repo link)
        onClose();
      } else {
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: PRICE_ID,
            mode: 'payment',
            customer_email: email,
          }),
        });
        if (res.status === 409) {
          setAlreadyPaid(true);
          return;
        }
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background border-border w-full max-w-sm rounded-lg border p-6 shadow-lg">
        {alreadyPaid ? (
          <div className="text-center">
            <div className="text-3xl">📬</div>
            <h2 className="text-foreground mt-3 text-lg font-semibold">
              You already have access
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Check your inbox at{' '}
              <span className="text-foreground font-medium">{email}</span> for
              the download link.
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-5 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              Got it
            </button>
          </div>
        ) : (
          <div>
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
                  {loading
                    ? isFree
                      ? 'Opening...'
                      : 'Redirecting...'
                    : isFree
                      ? 'Clone for free'
                      : 'Go to checkout'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
