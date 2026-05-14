'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import type { InvitationDetails } from '@/modules/invitation/invitation.types';

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordRepeat: z.string(),
  })
  .refine((d) => d.password === d.passwordRepeat, {
    message: 'Passwords do not match',
    path: ['passwordRepeat'],
  });

type FormData = z.infer<typeof schema>;

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuth();

  const token = searchParams.get('token');

  const [details, setDetails] = useState<InvitationDetails | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invalidTokenError = !token ? 'Invalid invitation link.' : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!token) return;

    fetch(`/api/invitations/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setLoadError('This invitation is invalid or has expired.');
        } else {
          setDetails(data);
        }
      })
      .catch(() => {
        setLoadError('Failed to load invitation.');
      });
  }, [token]);

  const acceptExisting = async () => {
    if (!token) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`/api/invitations/${token}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to accept invitation');
      }

      setToken(data.token);

      router.push(ROUTES.DEMO_DASHBOARD);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (form: FormData) => {
    if (!token) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`/api/invitations/${token}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to accept invitation');
      }

      setToken(data.token);

      router.push(ROUTES.DEMO_DASHBOARD);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 shadow-sm">
        {invalidTokenError || loadError ? (
          <p className="text-center text-sm text-red-600">
            {invalidTokenError || loadError}
          </p>
        ) : !details ? (
          <p className="text-muted-foreground text-center text-sm">
            Loading invitation…
          </p>
        ) : (
          <>
            <h1 className="text-foreground mb-2 text-center text-2xl font-semibold">
              You&apos;re invited
            </h1>
            <p className="text-muted-foreground mb-6 text-center text-sm">
              Join{' '}
              <strong className="text-foreground">
                {details.organization.name}
              </strong>{' '}
              as <span className="capitalize">{details.role}</span>
            </p>

            {details.isNewUser ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Set a password for your new account ({details.email}):
                </p>
                <div>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    disabled={isSubmitting}
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('passwordRepeat')}
                    type="password"
                    placeholder="Confirm password"
                    disabled={isSubmitting}
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
                  />

                  {errors.passwordRepeat && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.passwordRepeat.message}
                    </p>
                  )}
                </div>
                {submitError && (
                  <p className="text-xs text-red-600">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating account…' : 'Create account & join'}
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Accepting as{' '}
                  <strong className="text-foreground">{details.email}</strong>
                </p>
                {submitError && (
                  <p className="text-xs text-red-600">{submitError}</p>
                )}
                <button
                  onClick={acceptExisting}
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Accepting…' : 'Accept invitation'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
