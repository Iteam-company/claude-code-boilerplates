/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "@repo/ui/themes/brand.css": "../../packages/ui/src/themes/brand.css",
        "@repo/ui/styles/globals.css":
          "../../packages/ui/src/styles/globals.css",
      },
    },
  },
};

export default nextConfig;
