'use client';

import { useState } from 'react';
import { OrgContext } from '@/hooks/useOrg';

const ORG_KEY = 'current_org_id';

export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [orgId, setOrgIdState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem(ORG_KEY);
  });

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
