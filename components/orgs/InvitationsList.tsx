'use client';

import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { useInvitations } from '@/hooks/api/useInvitations';
import { useOrganization } from '@/hooks/api/useOrganizations';
import { MANAGER_ROLES } from '@/modules/orgMember/orgMember.types';
import { SendInvitationForm } from './SendInvitationForm';

interface Props {
  orgId: string;
}

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

export const InvitationsList = ({ orgId }: Props) => {
  const { data: invitations, isLoading, mutate } = useInvitations(orgId);
  const { data: org } = useOrganization(orgId);

  const canManage = MANAGER_ROLES.includes(
    org?.role as (typeof MANAGER_ROLES)[number],
  );

  const handleCancel = async (invitationId: string) => {
    try {
      const res = await fetch(
        `/api/organizations/${orgId}/invitations/${invitationId}`,
        {
          method: 'DELETE',
          headers: {
            ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
          },
        },
      );
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Failed to cancel');
      }
      mutate();
      toast.success('Invitation cancelled');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to cancel');
    }
  };

  return (
    <div>
      <h1 className="text-foreground mb-6 text-2xl font-semibold">
        Invitations
      </h1>

      {canManage && (
        <SendInvitationForm orgId={orgId} onSuccess={() => mutate()} />
      )}

      {isLoading && <p className="text-muted-foreground text-sm">Loading…</p>}

      <div className="space-y-2">
        {!isLoading && invitations?.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No pending invitations.
          </p>
        )}
        {invitations?.map((inv) => (
          <div
            key={inv.id}
            className="bg-card border-border flex items-center gap-3 rounded-lg border p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm">{inv.email}</p>
              <p className="text-muted-foreground text-xs capitalize">
                {inv.role} · Pending
              </p>
            </div>
            {canManage && (
              <button
                onClick={() => handleCancel(inv.id)}
                className="text-muted-foreground hover:text-destructive rounded-md p-1 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
