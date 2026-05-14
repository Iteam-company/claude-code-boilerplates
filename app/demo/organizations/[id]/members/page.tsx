import { MembersList } from '@/components/orgs/MembersList';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MembersPage({ params }: Props) {
  const { id } = await params;
  return <MembersList orgId={id} />;
}
