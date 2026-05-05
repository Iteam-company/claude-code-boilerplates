import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col overflow-y-scroll">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
