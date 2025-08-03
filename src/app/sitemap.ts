import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codematrics.com';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/web-development',
    '/services/mobile-apps',
    '/services/ui-ux-design',
    '/services/backend-development',
    '/technologies',
    '/technologies/react-vue',
    '/technologies/node-php',
    '/technologies/database-solutions',
    '/technologies/mobile-development',
    '/portfolio',
    '/blog',
    '/contact',
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority:
      path === ''
        ? 1
        : path.includes('/blog') || path.includes('/portfolio')
          ? 0.8
          : 0.7,
  }));

  return staticSitemap;
}
