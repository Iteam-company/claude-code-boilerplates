'use client';

import { useLayoutEffect, useState } from 'react';
import { OrgContext } from '@/hooks/useOrg';

const ORG_KEY = 'current_org_id';

export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [orgId, setOrgIdState] = useState<string | null>(null);

  useLayoutEffect(() => {
    const stored = localStorage.getItem(ORG_KEY);
    if (stored) setOrgIdState(stored);
  }, []);

  const setOrg = (id: string) => {
    localStorage.setItem(ORG_KEY, id);
    setOrgIdState(id);
  };

  const clearOrg = () => {
    localStorage.removeItem(ORG_KEY);
    setOrgIdState(null);
  };

  return (
    <OrgContext.Provider value={{ orgId, setOrg, clearOrg }}>
      {children}
    </OrgContext.Provider>
  );
};
