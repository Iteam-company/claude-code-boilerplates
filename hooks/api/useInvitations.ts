import useSWR from 'swr';
import { authFetcher } from '@/lib/fetcher';
import type { Invitation } from '@/modules/invitation/invitation.types';

export const useInvitations = (orgId: string | null) =>
  useSWR<Invitation[]>(
    orgId ? `/api/organizations/${orgId}/invitations` : null,
    (url: string) => authFetcher<Invitation[]>(url),
  );
