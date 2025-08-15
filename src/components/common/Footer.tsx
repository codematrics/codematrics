'use client';
import { Facebook, Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const navigation = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Mobile Apps', href: '/services/mobile-apps' },
      { name: 'Backend Development', href: '/services/backend-development' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    ],
    technologies: [
      { name: 'React & Vue', href: '/technologies/react-vue' },
      { name: 'Node.js & PHP', href: '/technologies/node-php' },
      { name: 'Mobile Development', href: '/technologies/mobile-development' },
      { name: 'Database Solutions', href: '/technologies/database-solutions' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  return (
    <footer className='bg-gradient-card border-t border-border'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Footer */}
        <div className='py-12 lg:py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='lg:col-span-1'>
              <div className='flex items-center space-x-2 mb-4'>
                <Image
                  src='/logo.png'
                  alt='CodeMatrics Logo'
                  width={32}
                  height={32}
                  className='h-8 w-8'
                />
                <span className='text-xl font-bold font-poppins text-primary'>
                  CodeMatrics
                </span>
              </div>
              <p className='text-muted-foreground mb-6 leading-relaxed'>
                Innovating code, empowering business. We deliver cutting-edge IT
                solutions that drive growth and transform digital experiences.
              </p>

              {/* Contact Info */}
              <div className='space-y-3'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <Mail size={16} className='mr-3 text-primary' />
                  codematricsitsolution@gmail.com
                </div>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <Phone size={16} className='mr-3 text-primary' />
                  +91 79843 95343
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className='font-semibold text-foreground mb-4'>Company</h3>
              <ul className='space-y-3'>
                {navigation.company.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-primary transition-colors text-sm'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className='font-semibold text-foreground mb-4'>Services</h3>
              <ul className='space-y-3'>
                {navigation.services.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-primary transition-colors text-sm'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Links */}
            <div>
              <h3 className='font-semibold text-foreground mb-4'>
                Technologies
              </h3>
              <ul className='space-y-3'>
                {navigation.technologies.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-primary transition-colors text-sm'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='border-t border-border py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <p className='text-sm text-muted-foreground mb-4 md:mb-0'>
              © 2025 CodeMatrics. All rights reserved.
            </p>

            {/* Social Links */}
            <div className='flex items-center space-x-4'>
              {socialLinks.map(item => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className='text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md'
                    aria-label={item.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
