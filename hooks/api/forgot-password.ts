import { api } from '@/lib/fetcher';
import { ForgotPasswordSchemaType } from '@/modules/user';
import useSWRMutation from 'swr/mutation';

export const useForgotPassword = () => {
  return useSWRMutation<
    { message: string },
    Error,
    string,
    ForgotPasswordSchemaType
  >(
    '/api/auth/forgot-password',
    api.post<ForgotPasswordSchemaType, { message: string }>,
  );
};
