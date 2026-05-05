import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ROUTES } from '@/lib/routes';
import { HeaderLinksType } from '@/types/header';

const links: HeaderLinksType = [{ title: 'Home', href: ROUTES.HOME }];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col overflow-y-scroll">
      <Header links={links} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
