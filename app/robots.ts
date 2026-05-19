import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/demo/',
        '/signin',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/verify-email',
        '/accept-invite',
      ],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
