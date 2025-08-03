'use client';
import { Button } from '@/components/ui/button';
import { ChevronUp, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();

  // Check if we're on a service or technology page where we want primary colors
  const isServiceOrTechOrBlogPage =
    pathname.startsWith('/services/') ||
    pathname.startsWith('/technologies/') ||
    pathname.startsWith('/blog');
  const shouldUsePrimaryColors = isScrolled || isServiceOrTechOrBlogPage;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Technologies', href: '/technologies' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          shouldUsePrimaryColors
            ? 'bg-background/95 backdrop-blur-md shadow-card'
            : 'bg-transparent text-white'
        }`}
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 lg:h-20'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center space-x-2 flex-shrink-0'
            >
              <Image
                src='/logo.png'
                alt='CodeMatrics Logo'
                width={40}
                height={40}
                className='h-8 w-8 lg:h-10 lg:w-10'
              />
              <span
                className={`text-lg lg:text-xl font-bold font-poppins ${
                  shouldUsePrimaryColors
                    ? 'bg-gradient-primary bg-clip-text text-transparent'
                    : 'text-white'
                } whitespace-nowrap`}
              >
                CodeMatrics
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-6 xl:space-x-8'>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap ${
                    pathname === item.href
                      ? 'text-primary after:w-full'
                      : shouldUsePrimaryColors
                        ? 'text-foreground'
                        : 'text-current'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className='hidden lg:flex items-center space-x-3 flex-shrink-0'>
              <Link href='/contact'>
                <Button
                  variant='outline'
                  size='sm'
                  className={`border-blue-300/50 ${shouldUsePrimaryColors ? 'text-primary' : 'text-white'} hover:text-white hover:bg-blue-500/20 backdrop-blur-sm group w-full sm:w-auto bg-transparent text-xs px-3`}
                >
                  Get Quote
                </Button>
              </Link>
              <Link href='/contact'>
                <Button
                  size='sm'
                  className='bg-gradient-primary border-0 text-xs px-3'
                >
                  Start Project
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${shouldUsePrimaryColors ? 'text-primary' : 'text-white'} hover:text-primary transition-colors`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='lg:hidden bg-background border-t border-border'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-primary bg-accent'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className='pt-4 space-y-2 grid grid-cols-1 gap-1'>
                <Link
                  href='/contact'
                  className='bg-transparent'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='border-blue-300/50 text-primary hover:bg-blue-500/20 backdrop-blur-sm group w-full sm:w-auto bg-transparent'
                  >
                    Get Quote
                  </Button>
                </Link>
                <Link href='/contact' onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size='sm'
                    className='w-full bg-gradient-primary border-0'
                  >
                    Start Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-hero hover:bg-primary-dark transition-all duration-300 hover:scale-110'
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default Header;
