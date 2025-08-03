'use client';

import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className='flex h-screen bg-background'>
      <AdminSidebar />
      <main className='flex-1 overflow-auto lg:ml-0'>
        <div className='lg:hidden h-16'></div>
        {children}
      </main>
    </div>
  );
}
