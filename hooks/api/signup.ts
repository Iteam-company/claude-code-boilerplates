import { poster } from '@/lib/fetcher';
import { AuthResponse, RegisterSchemaType } from '@/src/modules/user';
import useSWRMutation from 'swr/mutation';

export const useSignup = () => {
  return useSWRMutation<AuthResponse, Error, string, RegisterSchemaType>(
    `/api/auth/register`,
    poster<RegisterSchemaType, AuthResponse>,
  );
};
