'use client';

import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { EmailStep, type WaitlistResult } from './EmailStep';
import { GithubStep } from './GithubStep';
import { SuccessStep } from './SuccessStep';
import { DuplicateStep } from './DuplicateStep';

type Step = 'email' | 'github' | 'success' | 'duplicate';

const PRO_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME ?? '';

interface Props {
  plan: 'free' | 'pro';
  onClose: () => void;
}

export function EmailCaptureModal({ plan, onClose }: Props) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [paymentRequired, setPaymentRequired] = useState(false);

  const isFree = plan === 'free';

  async function redirectToCheckout(customerEmail: string, username: string) {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: PRO_PRICE_ID,
        mode: 'payment',
        customer_email: customerEmail,
        tier: 'pro',
        github_username: username,
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  async function handleEmailNext(submittedEmail: string, data: WaitlistResult) {
    setEmail(submittedEmail);

    if (data.alreadyExists) {
      if (!isFree && !data.hasGithub) {
        if (data.requiresPayment) setPaymentRequired(true);
        setStep('github');
        return;
      }
      if (data.requiresPayment) {
        // Use the github_username stored in DB - frontend state is empty at this point
        await redirectToCheckout(submittedEmail, data.githubUsername ?? '');
        return;
      }
      setStep('duplicate');
      return;
    }

    if (data.requiresPayment) {
      setPaymentRequired(true);
      setStep('github');
      return;
    }

    setStep(isFree ? 'success' : 'github');
  }

  async function handleGithubNext(username: string, requiresPayment: boolean) {
    if (paymentRequired || requiresPayment) {
      await redirectToCheckout(email, username);
      return;
    }
    setStep('success');
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

        {step === 'email' && <EmailStep plan={plan} onNext={handleEmailNext} />}
        {step === 'github' && (
          <GithubStep email={email} onNext={handleGithubNext} />
        )}

        {step === 'success' && (
          <SuccessStep isFree={isFree} onClose={onClose} />
        )}
        {step === 'duplicate' && <DuplicateStep onClose={onClose} />}
      </div>
    </div>
  );
}
