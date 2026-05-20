'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { EmailCaptureModal } from './EmailCaptureModal';

export function FinalCTA() {
  const [modal, setModal] = useState<'free' | 'pro' | null>(null);

  return (
    <section className="bg-zinc-950 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Stop wiring Stripe for the 4th time.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Clone the repo. Describe what you want. Ship today.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setModal('free')}
              className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Get the free version →
            </button>
            <button
              onClick={() => setModal('pro')}
              className="rounded-md border border-zinc-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Reserve your free Pro spot →
            </button>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            500+ developers &nbsp;·&nbsp; First 100 Pro spots free &nbsp;·&nbsp;
            No credit card.
          </p>
        </div>
      </Container>

      {modal && (
        <EmailCaptureModal plan={modal} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
