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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
  const router = useRouter();
  const { token, setToken } = useAuth();
  const { trigger: signup, error, isMutating } = useSignup();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(
      registerSchema.refine((data) => data.password === data.passwordRepeat, {
        message: 'Passwords do not match',
        path: ['passwordRepeat'],
      }),
    ),
    shouldUnregister: true,
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const result = await signup(data);

    if (result.token) {
      setToken(result.token);
    }

    router.push(ROUTES.HOME);
  };

  const handleHaveAccount = () => {
    router.push(ROUTES.SIGNIN);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && token) {
      router.replace(ROUTES.HOME);
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-card border-border min-w-[350px] rounded-xl border p-6 shadow-sm">
        <h1 className="text-foreground mb-6 text-center text-2xl font-semibold">
          Sign Up
        </h1>
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

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              disabled={isMutating}
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
              placeholder="Repeat password"
              disabled={isMutating}
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
            />
            {errors.passwordRepeat && (
              <p className="mt-1 text-xs text-red-600">
                {errors.passwordRepeat.message}
              </p>
            )}
          </div>

          {error && <p className="text-xs text-red-600">{error.message}</p>}

          <button
            type="submit"
            disabled={isMutating}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Sign Up
          </button>

          <button
            type="button"
            disabled={isMutating}
            onClick={handleHaveAccount}
            className="text-muted-foreground hover:text-foreground w-full rounded-md px-4 py-2 text-sm transition-colors disabled:opacity-50"
          >
            Already have account?
          </button>
        </form>
      </div>
    </div>
  );
}
