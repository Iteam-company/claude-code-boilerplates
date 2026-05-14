import type { Metadata } from 'next';
import { OrgProvider } from '@/components/demo/OrgProvider';
import { DemoHeader } from '@/components/demo/DemoHeader';
import { DemoSidebar } from '@/components/demo/DemoSidebar';

export const metadata: Metadata = {
  title: { default: 'Demo', template: '%s | Demo' },
  robots: { index: false, follow: false },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrgProvider>
      <div className="flex h-dvh flex-col">
        <DemoHeader />
        <div className="flex flex-1 overflow-hidden">
          <DemoSidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </OrgProvider>
  );
}
