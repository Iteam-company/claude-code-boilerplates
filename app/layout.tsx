import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'),
  ),
  title: {
    default: 'Claude Code Boilerplate',
    template: '%s | Claude Code Boilerplate',
  },
  description:
    'Next.js + Neon DB boilerplate with built-in Claude Code configuration — skills, hooks, agents, and CLAUDE.md patterns ready to use out of the box.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Claude Code Boilerplate',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
