import { api } from '@/lib/fetcher';
import { ResetPasswordSchemaType } from '@/modules/user';
import useSWRMutation from 'swr/mutation';

export const useResetPassword = () => {
  return useSWRMutation<
    { message: string },
    Error,
    string,
    ResetPasswordSchemaType
  >(
    '/api/auth/reset-password',
    api.post<ResetPasswordSchemaType, { message: string }>,
  );
};
