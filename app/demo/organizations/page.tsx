'use client';

import { useRouter } from 'next/navigation';
import { useOrganizations } from '@/hooks/api/useOrganizations';
import { useOrg } from '@/hooks/useOrg';
import { ROUTES } from '@/lib/routes';
import { Building2, ChevronRight, Plus } from 'lucide-react';

export default function OrganizationsPage() {
  const { data: orgs, isLoading } = useOrganizations();
  const { orgId, setOrg } = useOrg();
  const router = useRouter();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-semibold">
          Organizations
        </h1>
        <button
          onClick={() => router.push(ROUTES.DEMO_ORG_NEW)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          New
        </button>
      </div>

      {isLoading && <p className="text-muted-foreground text-sm">Loading…</p>}

      <div className="space-y-2">
        {!isLoading && orgs?.length === 0 && (
          <div className="border-border rounded-lg border border-dashed p-8 text-center">
            <Building2 className="text-muted-foreground mx-auto mb-3 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              No organizations yet.
            </p>
          </div>
        )}

        {orgs?.map((org) => (
          <div
            key={org.id}
            className={`bg-card border-border flex items-center gap-3 rounded-lg border p-4 ${
              org.id === orgId ? 'ring-primary ring-2' : ''
            }`}
          >
            <Building2 className="text-muted-foreground h-5 w-5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">
                {org.name}
              </p>
              <p className="text-muted-foreground text-xs capitalize">
                {org.role}
              </p>
            </div>
            <button
              onClick={() => {
                setOrg(org.id);
                router.push(ROUTES.DEMO_ORG_SETTINGS(org.id));
              }}
              className="hover:bg-muted rounded-md p-1.5 transition-colors"
            >
              <ChevronRight className="text-muted-foreground h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
