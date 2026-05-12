'use client';

import { useForgotPassword } from '@/hooks/api/forgot-password';
import { ROUTES } from '@/lib/routes';
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/modules/user/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { trigger, isMutating, error, data } = useForgotPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    await trigger(data);
  };

  if (data) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 text-center shadow-sm">
          <h1 className="text-foreground mb-2 text-2xl font-semibold">
            Check your email
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            If that email exists, a reset link has been sent.
          </p>
          <button
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 shadow-sm">
        <h1 className="text-foreground mb-2 text-center text-2xl font-semibold">
          Forgot password?
        </h1>
        <p className="text-muted-foreground mb-6 text-center text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              disabled={isMutating}
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {error && <p className="text-xs text-red-600">{error.message}</p>}

          <button
            type="submit"
            disabled={isMutating}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Send reset link
          </button>

          <button
            type="button"
            disabled={isMutating}
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="text-muted-foreground hover:text-foreground w-full rounded-md px-4 py-2 text-sm transition-colors disabled:opacity-50"
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
