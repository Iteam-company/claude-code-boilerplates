import { Header } from '@/components/header';
import { ROUTES } from '@/lib/routes';
import { HeaderLinksType } from '@/types/header';
import { PropsWithChildren } from 'react';

const links: HeaderLinksType = [
  { title: 'Home', href: ROUTES.HOME },
  { title: 'Admin Home', href: '/admin' },
  { title: 'Create Post', href: '/admin/create-post' },
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col">
      <Header links={links} />
      <main className="h-full">{children}</main>
    </div>
  );
}
