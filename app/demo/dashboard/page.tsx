'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useOrganizations, useCurrentOrg } from '@/hooks/api/useOrganizations';
import { ROUTES } from '@/lib/routes';
import { Building2, Mail, Settings, Users } from 'lucide-react';
import { MANAGER_ROLES } from '@/modules/orgMember/orgMember.types';
import { QuickLink } from '@/components/demo/QuickLink';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const { data: orgs } = useOrganizations();
  const { data: currentOrg } = useCurrentOrg();
  const router = useRouter();

  const canManage = MANAGER_ROLES.includes(
    currentOrg?.role as (typeof MANAGER_ROLES)[number],
  );

  if (!isAuthenticated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-foreground text-xl font-semibold">
            Welcome to the Demo
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in from the header to get started with organizations.
          </p>
        </div>
      </div>
    );
  }

  if (orgs && orgs.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Building2 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h2 className="text-foreground text-xl font-semibold">
            No Organizations Yet
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Create your first organization to get started.
          </p>
          <button
            onClick={() => router.push(ROUTES.DEMO_ORG_NEW)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Create Organization
          </button>
        </div>
      </div>
    );
  }

  if (!currentOrg) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Select an organization from the header switcher.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">
        {currentOrg.name}
      </h1>
      <p className="text-muted-foreground mt-1 text-sm capitalize">
        Your role: {currentOrg.role}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <QuickLink
          icon={<Users className="h-5 w-5" />}
          label="Members"
          onClick={() => router.push(ROUTES.DEMO_ORG_MEMBERS(currentOrg.id))}
        />
        {canManage && (
          <QuickLink
            icon={<Mail className="h-5 w-5" />}
            label="Invitations"
            onClick={() =>
              router.push(ROUTES.DEMO_ORG_INVITATIONS(currentOrg.id))
            }
          />
        )}
        <QuickLink
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          onClick={() => router.push(ROUTES.DEMO_ORG_SETTINGS(currentOrg.id))}
        />
      </div>
    </div>
  );
}
