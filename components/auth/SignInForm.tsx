'use client';
import { useSignin } from '@/hooks/api/useSignin';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { loginSchema, LoginSchemaType } from '@/modules/user/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/PasswordInput';

interface Props {
  redirectTo?: string;
}

export function SignInForm({ redirectTo }: Props) {
  const router = useRouter();
  const { setToken } = useAuth();
  const { trigger: signin, isMutating } = useSignin();
  const t = useTranslations('signIn');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    shouldUnregister: true,
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await signin(data);
      setToken();
      toast.success(t('successToast'));
      router.push(redirectTo ?? ROUTES.HOME);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : t('errorToast'));
    }
  };

  return (
    <>
      <h1 className="text-foreground mb-6 text-center text-2xl font-semibold">
        {t('title')}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder={t('email')}
            disabled={isMutating}
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <PasswordInput
            {...register('password')}
            placeholder={t('password')}
            disabled={isMutating}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isMutating}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
        >
          {t('submit')}
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={isMutating}
            onClick={() => router.push(ROUTES.SIGNUP)}
            className="text-muted-foreground hover:text-foreground rounded-md px-4 py-2 text-sm transition-colors disabled:opacity-50"
          >
            {t('noAccount')}
          </button>
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-muted-foreground hover:text-foreground rounded-md px-4 py-2 text-sm transition-colors"
          >
            {t('forgotPassword')}
          </Link>
        </div>
      </form>
    </>
  );
}
