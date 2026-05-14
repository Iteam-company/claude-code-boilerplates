import { InvitationsList } from '@/components/orgs/InvitationsList';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvitationsPage({ params }: Props) {
  const { id } = await params;
  return <InvitationsList orgId={id} />;
}
