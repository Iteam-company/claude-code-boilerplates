import { api } from '@/lib/fetcher';
import { AuthResponse, RegisterSchemaType } from '@/modules/user';
import useSWRMutation from 'swr/mutation';

export const useSignup = () => {
  return useSWRMutation<AuthResponse, Error, string, RegisterSchemaType>(
    `/api/auth/register`,
    api.post<RegisterSchemaType, AuthResponse>,
  );
};
