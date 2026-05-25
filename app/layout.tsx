import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cn, getBaseUrl } from '@/lib/utils';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js SaaS Boilerplate with Stripe — Free + Claude Code',
    template: '%s | Claude Code Boilerplate',
  },
  description:
    'Open-source Next.js SaaS starter with Stripe, auth, and Claude Code built in. Free forever. First 100 Pro users free. Ship a SaaS in days, not weeks.',
  keywords: [
    'next.js boilerplate',
    'saas starter kit',
    'nextjs saas template',
    'next.js stripe boilerplate',
    'claude code template',
    'nextjs ai boilerplate',
    'free nextjs boilerplate stripe',
  ],
  openGraph: {
    type: 'website',
    url: baseUrl,
    locale: 'en_US',
    siteName: 'Claude Code Boilerplate',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
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
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
