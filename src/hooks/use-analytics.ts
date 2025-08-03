'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track website visit
    const trackVisit = async () => {
      try {
        if (pathname.startsWith('/admin')) {
          // Don't track admin pages
          return;
        }

        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'website',
            page: pathname,
          }),
        });
      } catch {}
    };

    trackVisit();
  }, [pathname]);

  const trackBlogVisit = async (blogId: string, title?: string) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'blog',
          blogId,
          page: title,
        }),
      });
    } catch {}
  };

  return { trackBlogVisit };
}
