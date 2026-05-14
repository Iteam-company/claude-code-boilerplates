'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrg } from '@/hooks/useOrg';
import { useOrganizations } from '@/hooks/api/useOrganizations';
import { ROUTES } from '@/lib/routes';
import { Building2, Check, ChevronDown, Plus } from 'lucide-react';

export const OrgSwitcher = () => {
  const { orgId, setOrg } = useOrg();
  const { data: orgs } = useOrganizations();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!orgId && orgs && orgs.length > 0) {
      setOrg(orgs[0].id);
    }
  }, [orgs, orgId, setOrg]);

  const currentOrg = orgs?.find((o) => o.id === orgId);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="border-border bg-background hover:bg-muted flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
      >
        <Building2 className="text-muted-foreground h-4 w-4" />
        <span className="max-w-32 truncate">
          {currentOrg?.name ?? 'No organization'}
        </span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </button>

      {open && (
        <div className="bg-popover border-border absolute top-full left-0 z-50 mt-1 w-56 rounded-md border py-1 shadow-md">
          {(!orgs || orgs.length === 0) && (
            <p className="text-muted-foreground px-3 py-2 text-xs">
              No organizations yet
            </p>
          )}
          {orgs?.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                setOrg(org.id);
                setOpen(false);
                router.push(ROUTES.DEMO_DASHBOARD);
              }}
              className="hover:bg-accent flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
            >
              <Check
                className={`h-4 w-4 ${org.id === orgId ? 'opacity-100' : 'opacity-0'}`}
              />
              <span className="flex-1 truncate">{org.name}</span>
              <span className="text-muted-foreground text-xs capitalize">
                {org.role}
              </span>
            </button>
          ))}
          {orgs && orgs.length > 0 && (
            <div className="border-border my-1 border-t" />
          )}
          <button
            onClick={() => {
              setOpen(false);
              router.push(ROUTES.DEMO_ORG_NEW);
            }}
            className="hover:bg-accent flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create organization
          </button>
        </div>
      )}
    </div>
  );
};
