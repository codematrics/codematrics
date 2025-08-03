'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  LogOut,
  Menu,
  MessageSquare,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: BarChart3,
  },
  {
    name: 'Inquiries',
    href: '/admin/inquiries',
    icon: MessageSquare,
  },
  {
    name: 'Blogs',
    href: '/admin/blogs',
    icon: BookOpen,
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: Briefcase,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });

      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });

      router.push('/admin/login');
    } catch {
      toast({
        title: 'Logout Error',
        description: 'Failed to logout properly.',
      });
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className='lg:hidden fixed top-4 left-4 z-50'>
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variant='outline'
          size='sm'
          className='p-2'
        >
          {isMobileMenuOpen ? (
            <X className='h-4 w-4' />
          ) : (
            <Menu className='h-4 w-4' />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-background border-r border-border h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className='p-6 border-b border-border'>
          <div className='flex items-center gap-2'>
            <User className='h-8 w-8 text-primary' />
            <div>
              <h2 className='text-lg font-semibold text-foreground'>
                Admin Panel
              </h2>
              <p className='text-sm text-muted-foreground'>CodeMatrics</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {sidebarItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className='h-4 w-4' />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className='p-4 border-t border-border'>
          <Button
            onClick={handleLogout}
            variant='outline'
            className='w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700'
          >
            <LogOut className='h-4 w-4' />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
