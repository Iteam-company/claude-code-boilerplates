import useSWR from 'swr';
import { authApi } from '@/lib/fetcher';
import type { OrgMemberWithUser } from '@/modules/orgMember/orgMember.types';

export const useMembers = (orgId: string | null) =>
  useSWR<OrgMemberWithUser[]>(
    orgId ? `/api/organizations/${orgId}/members` : null,
    authApi.get,
  );
