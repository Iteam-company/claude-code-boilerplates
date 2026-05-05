'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

export default function SignUpPage() {
  const router = useRouter();
  const { setToken } = useAuth();
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

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Card className="min-w-87.5">
        <CardHeader>
          <h1 className="text-center text-2xl">Sign Up</h1>
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
                <p className="text-red-600">{errors.email.message}</p>
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
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register('passwordRepeat')}
                type="password"
                placeholder="Repeat password"
                disabled={isMutating}
              />
              {errors.passwordRepeat && (
                <p className="text-red-600">{errors.passwordRepeat.message}</p>
              )}
            </div>
            {error && <p className="text-red-600">{error.message}</p>}

            <Button type="submit" className="w-full" disabled={isMutating}>
              Sign Up
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              disabled={isMutating}
              onClick={handleHaveAccount}
            >
              Already have account?
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
