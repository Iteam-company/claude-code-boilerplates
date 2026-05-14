'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, Trash2 } from 'lucide-react';
import { useInvitations } from '@/hooks/api/useInvitations';
import { useOrganization } from '@/hooks/api/useOrganizations';

const schema = z.object({
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'member']),
});
type FormData = z.infer<typeof schema>;

interface Props {
  orgId: string;
}

export const InvitationsList = ({ orgId }: Props) => {
  const { data: invitations, isLoading, mutate } = useInvitations(orgId);
  const { data: org } = useOrganization(orgId);
  const [isSending, setIsSending] = useState(false);

  const canManage = org?.role === 'owner' || org?.role === 'admin';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'member' },
  });

  const getToken = () =>
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const onSend = async (data: FormData) => {
    setIsSending(true);
    try {
      const res = await fetch(`/api/organizations/${orgId}/invitations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Failed to send');
      }
      mutate();
      reset();
      toast.success('Invitation sent');
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to send invitation',
      );
    } finally {
      setIsSending(false);
    }
  };

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
        <div className="bg-card border-border mb-6 rounded-lg border p-4">
          <h2 className="text-foreground mb-3 text-sm font-medium">
            Send invitation
          </h2>
          <form
            onSubmit={handleSubmit(onSend)}
            className="flex flex-wrap gap-2"
          >
            <div className="min-w-0 flex-1">
              <input
                {...register('email')}
                type="email"
                placeholder="Email address"
                disabled={isSending}
                className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <select
              {...register('role')}
              disabled={isSending}
              className="border-input bg-background text-foreground rounded-md border px-2 py-2 text-sm outline-none disabled:opacity-50"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={isSending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Mail className="h-4 w-4" />
              {isSending ? 'Sending…' : 'Send'}
            </button>
          </form>
        </div>
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
