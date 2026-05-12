'use client';

import { useResetPassword } from '@/hooks/api/reset-password';
import { ROUTES } from '@/lib/routes';
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/modules/user/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';
  const { trigger, isMutating, error, data } = useResetPassword();
  const t = useTranslations('resetPassword');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await trigger(data);
  };

  if (!token) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 text-center shadow-sm">
          <h1 className="text-foreground mb-2 text-2xl font-semibold">
            {t('invalidLink')}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('invalidLinkDescription')}
          </p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 text-center shadow-sm">
          <h1 className="text-foreground mb-2 text-2xl font-semibold">
            {t('updated')}
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            {t('updatedDescription')}
          </p>
          <button
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 text-sm font-medium transition-colors"
          >
            {t('signIn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-card border-border min-w-87.5 rounded-xl border p-6 shadow-sm">
        <h1 className="text-foreground mb-6 text-center text-2xl font-semibold">
          {t('title')}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input type="hidden" {...register('token')} />

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder={t('newPassword')}
              disabled={isMutating}
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && <p className="text-xs text-red-600">{error.message}</p>}

          <button
            type="submit"
            disabled={isMutating}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
