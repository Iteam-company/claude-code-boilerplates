'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

interface Props {
  token: string;
  details: InvitationDetails;
  onAccepted: (jwtToken: string) => void;
}

export function NewUserInviteForm({ token, details, onAccepted }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (form: FormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/invitations/${token}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to accept invitation');
      onAccepted(data.token);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
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
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Creating account…' : 'Create account & join'}
      </button>
    </form>
  );
}
