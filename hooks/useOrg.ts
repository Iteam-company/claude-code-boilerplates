import { createContext, useContext, useLayoutEffect, useState } from 'react';

const ORG_KEY = 'current_org_id';

interface OrgContextValue {
  orgId: string | null;
  setOrg: (id: string) => void;
  clearOrg: () => void;
}

export const OrgContext = createContext<OrgContextValue>({
  orgId: null,
  setOrg: () => {},
  clearOrg: () => {},
});

export const useOrg = () => useContext(OrgContext);
