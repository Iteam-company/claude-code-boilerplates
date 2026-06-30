import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Auth pages are disabled on the demo/marketing site so visitors can't
  // create accounts here. REMOVE THIS LINE when building your own app.
  return notFound();
  return <main>{children}</main>;
}
