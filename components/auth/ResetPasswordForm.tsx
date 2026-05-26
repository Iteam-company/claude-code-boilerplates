'use client';
import { useResetPassword } from '@/hooks/api/resetPassword';
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/modules/user/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/lib/routes';

interface Props {
  token: string;
}

export function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
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

  if (data) {
    return (
      <div className="text-center">
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
    );
  }

  return (
    <>
      <h1 className="text-foreground mb-6 text-center text-2xl font-semibold">
        {t('title')}
      </h1>
      <form onSubmit={handleSubmit((d) => trigger(d))} className="space-y-3">
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
    </>
  );
}
