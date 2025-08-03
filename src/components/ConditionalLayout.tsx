'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { useAnalytics } from '@/hooks/use-analytics';
import { usePathname } from 'next/navigation';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  // Track analytics for non-admin pages
  useAnalytics();

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
