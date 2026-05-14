import { OrgSettingsForm } from '@/components/orgs/OrgSettingsForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrgSettingsPage({ params }: Props) {
  const { id } = await params;
  return <OrgSettingsForm orgId={id} />;
}
