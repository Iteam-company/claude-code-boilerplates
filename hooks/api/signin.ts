import { poster } from '@/lib/fetcher';
import { AuthResponse, LoginSchemaType } from '@/src/modules/user';
import useSWRMutation from 'swr/mutation';

export const useSignin = () => {
  return useSWRMutation<AuthResponse, Error, string, LoginSchemaType>(
    `/api/auth/login`,
    poster<LoginSchemaType, AuthResponse>,
  );
};
