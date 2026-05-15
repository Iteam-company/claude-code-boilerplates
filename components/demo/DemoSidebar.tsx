'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrg } from '@/hooks/useOrg';
import { ROUTES } from '@/lib/routes';
import {
  ArrowLeft,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOrganizations } from '@/hooks/api/useOrganizations';
import { MANAGER_ROLES } from '@/modules/orgMember/orgMember.types';

const navItem = (active: boolean) =>
  cn(
    'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
    active
      ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
  );

export const DemoSidebar = () => {
  const pathname = usePathname();
  const { orgId } = useOrg();
  const { data: orgs } = useOrganizations();

  const org = orgs?.find((o) => o.id === orgId);
  const canManage = MANAGER_ROLES.includes(
    org?.role as (typeof MANAGER_ROLES)[number],
  );

  return (
    <aside className="bg-sidebar border-sidebar-border flex w-56 shrink-0 flex-col border-r">
      <nav className="flex flex-1 flex-col p-3">
        <div className="flex-1 space-y-1">
          <Link
            href={ROUTES.DEMO_DASHBOARD}
            className={navItem(pathname === ROUTES.DEMO_DASHBOARD)}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          {orgId && (
            <>
              <div className="border-sidebar-border my-2 border-t" />
              <p className="text-sidebar-foreground/50 px-3 py-1 text-xs font-medium tracking-wider uppercase">
                Current Org
              </p>
              <Link
                href={ROUTES.DEMO_ORG_SETTINGS(orgId)}
                className={navItem(pathname.includes('/settings'))}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href={ROUTES.DEMO_ORG_MEMBERS(orgId)}
                className={navItem(pathname.includes('/members'))}
              >
                <Users className="h-4 w-4" />
                Members
              </Link>
              {canManage && (
                <Link
                  href={ROUTES.DEMO_ORG_INVITATIONS(orgId)}
                  className={navItem(pathname.includes('/invitations'))}
                >
                  <Mail className="h-4 w-4" />
                  Invitations
                </Link>
              )}
            </>
          )}
        </div>

        <div className="border-sidebar-border border-t pt-3">
          <Link
            href={ROUTES.HOME}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
      </nav>
    </aside>
  );
};
