'use client';
import { useSignup } from '@/hooks/api/signup';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import {
  registerSchema,
  RegisterSchemaType,
} from '@/modules/user/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/PasswordInput';

interface Props {
  redirectTo?: string;
}

export function SignUpForm({ redirectTo }: Props) {
  const router = useRouter();
  const { setToken } = useAuth();
  const { trigger: signup, isMutating } = useSignup();
  const t = useTranslations('signUp');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(
      registerSchema.refine((data) => data.password === data.passwordRepeat, {
        message: t('passwordsMismatch'),
        path: ['passwordRepeat'],
      }),
    ),
    shouldUnregister: true,
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await signup(data);
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

        <div>
          <PasswordInput
            {...register('passwordRepeat')}
            placeholder={t('repeatPassword')}
            disabled={isMutating}
          />
          {errors.passwordRepeat && (
            <p className="mt-1 text-xs text-red-600">
              {errors.passwordRepeat.message}
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

        <button
          type="button"
          disabled={isMutating}
          onClick={() => router.push(ROUTES.SIGNIN)}
          className="text-muted-foreground hover:text-foreground w-full rounded-md px-4 py-2 text-sm transition-colors disabled:opacity-50"
        >
          {t('haveAccount')}
        </button>
      </form>
    </>
  );
}
