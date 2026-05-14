import { createContext, useContext } from 'react';

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
