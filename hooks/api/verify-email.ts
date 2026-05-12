import { poster } from '@/lib/fetcher';
import { VerifyEmailSchemaType } from '@/modules/user';
import useSWRMutation from 'swr/mutation';

export const useVerifyEmail = () => {
  return useSWRMutation<
    { message: string },
    Error,
    string,
    VerifyEmailSchemaType
  >(
    '/api/auth/verify-email',
    poster<VerifyEmailSchemaType, { message: string }>,
  );
};
