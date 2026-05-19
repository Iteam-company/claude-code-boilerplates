import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cn, getBaseUrl } from '@/lib/utils';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import './globals.css';
import { OrgProvider } from '@/components/demo/OrgProvider';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Claude Code Boilerplate',
    template: '%s | Claude Code Boilerplate',
  },
  description:
    'Production-ready Next.js 16 + Neon DB starter pre-wired for Claude Code — auth, payments, blog, email, and AI chat built in.',
  openGraph: {
    type: 'website',
    url: baseUrl,
    locale: 'en_US',
    siteName: 'Claude Code Boilerplate',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  other: {
    'og:logo': `${baseUrl}/opengraph-image`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-sans', geist.variable)}
    >
      <body className="min-h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <OrgProvider>
              {children}
              <Toaster />
            </OrgProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
