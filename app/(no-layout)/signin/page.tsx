'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSignin } from '@/hooks/api/signin';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/routes';
import { loginSchema, LoginSchemaType } from '@/modules/user/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function SignInPage() {
  const router = useRouter();
  const { token, setToken } = useAuth();
  const { trigger: signin, error, isMutating } = useSignin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    shouldUnregister: true,
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const result = await signin(data);

    if (result.token) {
      setToken(result.token);
    }

    router.push(ROUTES.HOME);
  };

  const handleDontHaveAccount = () => {
    router.push(ROUTES.SIGNUP);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && token) {
      router.replace(ROUTES.HOME);
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Card className="min-w-87.5">
        <CardHeader>
          <h1 className="text-center text-2xl">Sign In</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email"
                disabled={isMutating}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                disabled={isMutating}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            {error && <ErrorMessage>{error.message}</ErrorMessage>}

            <Button type="submit" className="w-full" disabled={isMutating}>
              Sign In
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              disabled={isMutating}
              onClick={handleDontHaveAccount}
            >
              Don&apos;t have account?
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
