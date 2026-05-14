'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import {
  useOrganizations,
  useUpdateOrganization,
  useDeleteOrganization,
} from '@/hooks/api/useOrganizations';
import { useOrg } from '@/hooks/useOrg';
import { ROUTES } from '@/lib/routes';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
});
type FormData = z.infer<typeof schema>;

interface Props {
  orgId: string;
}

interface DeleteDialogProps {
  orgName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CONFIRM_PHRASE = 'delete my organization';

const DeleteDialog = ({
  orgName,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteDialogProps) => {
  const [nameInput, setNameInput] = useState('');
  const [phraseInput, setPhraseInput] = useState('');

  const isValid = nameInput === orgName && phraseInput === CONFIRM_PHRASE;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background border-border w-full max-w-md rounded-lg border p-6 shadow-lg">
        <h2 className="text-foreground mb-1 text-lg font-semibold">
          Delete organization
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          This action is permanent and cannot be undone. All members and data
          will be lost.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Enter the organization name &quot;
              <span className="font-mono font-semibold">{orgName}</span>&quot;
              to confirm
            </label>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              autoComplete="off"
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Type &quot;
              <span className="font-mono font-semibold">{CONFIRM_PHRASE}</span>
              &quot; to confirm
            </label>
            <input
              value={phraseInput}
              onChange={(e) => setPhraseInput(e.target.value)}
              autoComplete="off"
              className="bg-background w-full rounded-md border border-red-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200 dark:border-red-600 dark:text-red-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="border-input text-foreground hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isValid || isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-600"
          >
            {isDeleting ? 'Deleting…' : 'Delete organization'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const OrgSettingsForm = ({ orgId }: Props) => {
  const { data: orgs } = useOrganizations();
  const { trigger: update, isMutating: isUpdating } =
    useUpdateOrganization(orgId);
  const { trigger: del, isMutating: isDeleting } = useDeleteOrganization(orgId);
  const { orgId: currentOrgId, clearOrg } = useOrg();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const org = orgs?.find((o) => o.id === orgId);
  const canEdit = org?.role === 'owner' || org?.role === 'admin';
  const isOwner = org?.role === 'owner';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: { name: org?.name ?? '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await update(data);
      mutate('/api/organizations');
      toast.success('Organization updated');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      await del();
      mutate('/api/organizations');
      if (currentOrgId === orgId) clearOrg();
      toast.success('Organization deleted');
      router.push(ROUTES.DEMO_ORGS);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setShowDeleteDialog(false);
    }
  };

  if (!org) {
    return <p className="text-muted-foreground text-sm">Loading…</p>;
  }

  return (
    <>
      {showDeleteDialog && (
        <DeleteDialog
          orgName={org.name}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}

      <div className="max-w-md">
        <h1 className="text-foreground mb-6 text-2xl font-semibold">
          Organization Settings
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              {...register('name')}
              disabled={!canEdit || isUpdating}
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          {canEdit && (
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Saving…' : 'Save changes'}
            </button>
          )}
        </form>

        {isOwner && (
          <div className="mt-10 rounded-lg border border-red-200 p-4 dark:border-red-900">
            <h2 className="text-foreground mb-1 text-sm font-semibold">
              Danger Zone
            </h2>
            <p className="text-muted-foreground mb-3 text-xs">
              Deleting this organization is permanent and cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              Delete organization
            </button>
          </div>
        )}
      </div>
    </>
  );
};
