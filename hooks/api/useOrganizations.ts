import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { authFetcher } from '@/lib/fetcher';
import type {
  Organization,
  UpdateOrganizationInput,
} from '@/modules/organization/organization.types';
import type { OrgRole } from '@/modules/orgMember/orgMember.schema';

export type OrgWithRole = Organization & { role: OrgRole };

const ORGS_KEY = '/api/organizations';

export const useOrganizations = () =>
  useSWR<OrgWithRole[]>(ORGS_KEY, (url: string) =>
    authFetcher<OrgWithRole[]>(url),
  );

export const useCreateOrganization = () => {
  const { mutate } = useSWRConfig();
  return useSWRMutation<Organization, Error, string, { name: string }>(
    ORGS_KEY,
    (url, { arg }) =>
      authFetcher<Organization>(url, {
        method: 'POST',
        body: JSON.stringify(arg),
      }),
    { onSuccess: () => mutate(ORGS_KEY) },
  );
};

export const useUpdateOrganization = (id: string) => {
  const { mutate } = useSWRConfig();
  return useSWRMutation<Organization, Error, string, UpdateOrganizationInput>(
    `/api/organizations/${id}`,
    (url, { arg }) =>
      authFetcher<Organization>(url, {
        method: 'PUT',
        body: JSON.stringify(arg),
      }),
    { onSuccess: () => mutate(ORGS_KEY) },
  );
};

export const useDeleteOrganization = (id: string) => {
  const { mutate } = useSWRConfig();
  return useSWRMutation<void, Error, string>(
    `/api/organizations/${id}`,
    (url) => authFetcher<void>(url, { method: 'DELETE' }),
    { onSuccess: () => mutate(ORGS_KEY) },
  );
};
