import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  transpilePackages: [
    'react-markdown',
    'remark-gfm',
    'react-syntax-highlighter',
  ],
};

export default withNextIntl(nextConfig);
