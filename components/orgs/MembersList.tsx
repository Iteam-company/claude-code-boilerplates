'use client';

import { useMembers } from '@/hooks/api/useMembers';
import { useOrganization } from '@/hooks/api/useOrganizations';
import { MemberRow } from './MemberRow';

interface Props {
  orgId: string;
}

const getCurrentUserId = (): string | null => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id ?? null;
  } catch {
    return null;
  }
};

export const MembersList = ({ orgId }: Props) => {
  const { data: members, isLoading, mutate } = useMembers(orgId);
  const { data: org } = useOrganization(orgId);

  const canManage = org?.role === 'owner' || org?.role === 'admin';
  const isOwner = org?.role === 'owner';
  const currentUserId =
    typeof window !== 'undefined' ? getCurrentUserId() : null;

  return (
    <div>
      <h1 className="text-foreground mb-6 text-2xl font-semibold">Members</h1>

      {isLoading && <p className="text-muted-foreground text-sm">Loading…</p>}

      <div className="space-y-2">
        {members?.map((m) => (
          <MemberRow
            key={m.id}
            member={m}
            orgId={orgId}
            canManage={canManage ?? false}
            isOwner={isOwner ?? false}
            isSelf={m.user.id === currentUserId}
            onRefresh={() => mutate()}
          />
        ))}
        {!isLoading && members?.length === 0 && (
          <p className="text-muted-foreground text-sm">No members found.</p>
        )}
      </div>
    </div>
  );
};
