import ConditionalLayout from '@/components/ConditionalLayout';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codematrics.com'),
  title: {
    default:
      'CodeMatrics - Premier IT Solutions & Software Development Company',
    template: '%s | CodeMatrics',
  },
  description:
    'CodeMatrics delivers cutting-edge IT solutions, web development, mobile apps, UI/UX design, and backend development. Transform your business with our expert technology services.',
  keywords: [
    'IT solutions',
    'software development',
    'web development',
    'mobile app development',
    'UI UX design',
    'backend development',
    'React development',
    'Node.js development',
    'full stack development',
    'custom software',
    'business automation',
    'digital transformation',
    'technology consulting',
    'CodeMatrics',
    'IT company India',
    'software company India',
    'tech solutions provider',
    'enterprise software',
    'startup development',
    'e-commerce development',
    'API development',
    'database design',
    'cloud solutions',
    'microservices',
    'responsive web design',
    'mobile first design',
    'JavaScript development',
    'TypeScript development',
    'Python development',
    'MongoDB development',
    'PostgreSQL development',
    'SEO optimization',
    'performance optimization',
    'scalable applications',
  ],
  authors: [{ name: 'CodeMatrics Team' }],
  creator: 'CodeMatrics',
  publisher: 'CodeMatrics',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codematrics.com',
    siteName: 'CodeMatrics',
    title: 'CodeMatrics - Premier IT Solutions & Software Development Company',
    description:
      'Transform your business with cutting-edge IT solutions. Expert web development, mobile apps, UI/UX design, and backend development services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeMatrics - IT Solutions & Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeMatrics - Premier IT Solutions & Software Development Company',
    description:
      'Transform your business with cutting-edge IT solutions. Expert web development, mobile apps, UI/UX design, and backend development services.',
    images: ['/og-image.jpg'],
    creator: '@codematrics',
  },
  verification: {
    google: 'P0jHynGstXmNhoxIBQTnL-74RdmQrL1bBav43LQRTwA',
  },
  alternates: {
    canonical: 'https://codematrics.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster />
      </body>
      <GoogleAnalytics gaId='G-ZV0X3M9MQC' />
    </html>
  );
}
