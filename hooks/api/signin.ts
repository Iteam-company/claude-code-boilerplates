import { api } from '@/lib/fetcher';
import { AuthResponse, LoginSchemaType } from '@/modules/user';
import useSWRMutation from 'swr/mutation';

export const useSignin = () => {
  return useSWRMutation<AuthResponse, Error, string, LoginSchemaType>(
    `/api/auth/login`,
    api.post<LoginSchemaType, AuthResponse>,
  );
};
