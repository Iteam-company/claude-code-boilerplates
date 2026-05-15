'use client';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import type { OrgMemberWithUser } from '@/modules/orgMember/orgMember.types';
import type { OrgRole } from '@/modules/orgMember/orgMember.schema';

interface Props {
  member: OrgMemberWithUser;
  orgId: string;
  canManage: boolean;
  isOwner: boolean;
  isSelf: boolean;
  onRefresh: () => void;
}

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

export function MemberRow({
  member,
  orgId,
  canManage,
  isOwner,
  isSelf,
  onRefresh,
}: Props) {
  const handleRoleChange = async (role: OrgRole) => {
    try {
      const res = await fetch(
        `/api/organizations/${orgId}/members/${member.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
          },
          body: JSON.stringify({ role }),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to update role');
      }
      onRefresh();
      toast.success('Role updated');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  const handleRemove = async () => {
    if (!confirm('Remove this member?')) return;
    try {
      const res = await fetch(
        `/api/organizations/${orgId}/members/${member.id}`,
        {
          method: 'DELETE',
          headers: {
            ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
          },
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to remove member');
      }
      onRefresh();
      toast.success('Member removed');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove');
    }
  };

  return (
    <div className="bg-card border-border flex items-center gap-3 rounded-lg border p-3">
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm">{member.user.email}</p>
        <p className="text-muted-foreground text-xs capitalize">
          {member.role}
        </p>
      </div>
      {canManage && member.role !== 'owner' && !isSelf && (
        <select
          value={member.role}
          onChange={(e) => handleRoleChange(e.target.value as OrgRole)}
          className="border-input bg-background text-foreground rounded-md border px-2 py-1 text-xs outline-none"
        >
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      )}
      {isOwner && member.role !== 'owner' && !isSelf && (
        <button
          onClick={handleRemove}
          className="text-muted-foreground hover:text-destructive rounded-md p-1 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
