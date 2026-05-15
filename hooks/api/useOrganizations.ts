import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { authApi } from '@/lib/fetcher';
import { useOrg } from '@/hooks/useOrg';
import type {
  Organization,
  UpdateOrganizationInput,
} from '@/modules/organization/organization.types';
import type { OrgRole } from '@/modules/orgMember/orgMember.schema';

export type OrgWithRole = Organization & { role: OrgRole };

const ORGS_KEY = '/api/organizations';

export const useOrganizations = () =>
  useSWR<OrgWithRole[]>(ORGS_KEY, authApi.get);

export const useOrganization = (id: string | null) =>
  useSWR<OrgWithRole>(id ? `/api/organizations/${id}` : null, authApi.get);

export const useCurrentOrg = () => {
  const { orgId } = useOrg();
  return useOrganization(orgId);
};

export const useCreateOrganization = () => {
  const { mutate } = useSWRConfig();
  return useSWRMutation<Organization, Error, string, { name: string }>(
    ORGS_KEY,
    authApi.post<{ name: string }, Organization>,
    { onSuccess: () => mutate(ORGS_KEY) },
  );
};

export const useUpdateOrganization = (id: string) => {
  const { mutate } = useSWRConfig();
  return useSWRMutation<Organization, Error, string, UpdateOrganizationInput>(
    `/api/organizations/${id}`,
    authApi.put<UpdateOrganizationInput, Organization>,
    { onSuccess: () => mutate(ORGS_KEY) },
  );
};

export const useDeleteOrganization = (id: string) => {
  const { mutate } = useSWRConfig();
  return useSWRMutation<void, Error, string>(
    `/api/organizations/${id}`,
    authApi.delete,
    { onSuccess: () => mutate(ORGS_KEY) },
  );
};
