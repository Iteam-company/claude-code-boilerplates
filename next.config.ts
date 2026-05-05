import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  /* Other config options here */
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Wrap the nextConfig with the withMDX higher-order function
export default withMDX(nextConfig);
