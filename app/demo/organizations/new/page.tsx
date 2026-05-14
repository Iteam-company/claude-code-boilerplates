'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useCreateOrganization } from '@/hooks/api/useOrganizations';
import { useOrg } from '@/hooks/useOrg';
import { ROUTES } from '@/lib/routes';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
});
type FormData = z.infer<typeof schema>;

export default function NewOrgPage() {
  const { trigger, isMutating } = useCreateOrganization();
  const { setOrg } = useOrg();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const org = await trigger(data);
      setOrg(org.id);
      toast.success('Organization created');
      router.push(ROUTES.DEMO_ORG_SETTINGS(org.id));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="text-foreground mb-6 text-2xl font-semibold">
        Create Organization
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">
            Organization name
          </label>
          <input
            {...register('name')}
            placeholder="Acme Inc."
            disabled={isMutating}
            autoFocus
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isMutating}
            className="border-border hover:bg-muted flex-1 rounded-md border px-4 py-2 text-sm transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isMutating}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isMutating ? 'Creating…' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
