'use client';

import { useState } from 'react';
import { Loader2Icon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'email' | 'github' | 'success';

const PRO_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? '';

interface Props {
  plan: 'free' | 'pro';
  onClose: () => void;
}

function validateEmail(v: string): string {
  if (!v) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email.';
  return '';
}

function validateGithub(v: string): string {
  if (!v) return 'GitHub username is required.';
  if (v.length > 39) return 'Maximum 39 characters.';
  if (!/^[a-zA-Z0-9-]+$/.test(v))
    return 'Only letters, numbers, and hyphens allowed.';
  if (v.startsWith('-') || v.endsWith('-'))
    return 'Cannot start or end with a hyphen.';
  if (/--/.test(v)) return 'Cannot contain consecutive hyphens.';
  return '';
}

export function EmailCaptureModal({ plan, onClose }: Props) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [github, setGithub] = useState('');
  const [githubError, setGithubError] = useState('');
  const [githubChecking, setGithubChecking] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFree = plan === 'free';

  async function checkGithubUser(username: string) {
    const formatErr = validateGithub(username);
    if (formatErr) {
      setGithubError(formatErr);
      return;
    }
    setGithubChecking(true);
    setGithubError('');
    try {
      const res = await fetch(`/api/github/${encodeURIComponent(username)}`);
      if (res.status === 404) setGithubError('GitHub user not found.');
    } catch {
      // network error — don't block submission
    } finally {
      setGithubChecking(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      });
      setStep(isFree ? 'success' : 'github');
    } finally {
      setLoading(false);
    }
  }

  async function submitGithub(e: React.FormEvent) {
    e.preventDefault();
    const err = validateGithub(github);
    if (err || githubError) {
      if (err) setGithubError(err);
      return;
    }
    setLoading(true);
    try {
      const waitlistRes = await fetch('/api/waitlist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, githubUsername: github }),
      });
      const waitlistData = await waitlistRes.json();

      if (!waitlistData.requiresPayment) {
        setStep('success');
        return;
      }

      const checkoutRes = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: PRO_PRICE_ID,
          mode: 'payment',
          customer_email: email,
          source: 'waitlist',
        }),
      });
      const checkoutData = await checkoutRes.json();
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background border-border relative w-full max-w-sm rounded-lg border p-6 shadow-lg">
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground absolute top-4 right-4 transition-colors"
          aria-label="Close"
        >
          <XIcon className="h-4 w-4" />
        </button>

        {step === 'email' && (
          <form onSubmit={submitEmail} noValidate>
            <h2 className="text-foreground text-lg font-semibold">
              {isFree
                ? 'Get the free boilerplate'
                : 'Reserve your free Pro spot'}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {isFree
                ? "Enter your email and we'll send you the GitHub link."
                : 'Enter your email to join the waitlist. First 100 spots are free.'}
            </p>

            <div className="mt-5">
              <label className="text-foreground mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailError(validateEmail(email))}
                placeholder="you@example.com"
                inputMode="email"
                autoComplete="email"
                autoFocus
                className={cn(
                  'border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2',
                  emailError && 'border-red-500 focus:ring-red-500/30',
                )}
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-500">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
              {isFree ? 'Get the repo →' : 'Join waitlist →'}
            </button>
          </form>
        )}

        {step === 'github' && (
          <form onSubmit={submitGithub} noValidate>
            <h2 className="text-foreground text-lg font-semibold">
              One more step
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Add your GitHub username so we can send the invite when your spot
              opens.
            </p>

            <div className="mt-5">
              <label className="text-foreground mb-1.5 block text-sm font-medium">
                GitHub username
              </label>
              <div className="flex items-center">
                <span className="border-input bg-muted text-muted-foreground rounded-l-md border border-r-0 px-3 py-2 text-sm select-none">
                  @
                </span>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => {
                    setGithub(e.target.value);
                    if (githubError)
                      setGithubError(validateGithub(e.target.value));
                  }}
                  onBlur={() => checkGithubUser(github)}
                  placeholder="username"
                  autoFocus
                  autoComplete="username"
                  className={cn(
                    'border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring flex-1 rounded-r-md border px-3 py-2 text-sm outline-none focus:ring-2',
                    githubError && 'border-red-500 focus:ring-red-500/30',
                  )}
                />
              </div>
              {githubChecking && (
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                  <Loader2Icon className="h-3 w-3 animate-spin" />
                  Checking username…
                </p>
              )}
              {githubError && (
                <p className="mt-1 text-xs text-red-500">{githubError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || githubChecking || !github || !!githubError}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
              Confirm my spot &rarr;
            </button>
          </form>
        )}

        {step === 'success' && isFree && (
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
        )}

        {step === 'success' && !isFree && (
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
        )}
      </div>
    </div>
  );
}
