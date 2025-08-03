import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get Your Project Started | CodeMatrics',
  description:
    'Ready to transform your business with cutting-edge IT solutions? Contact CodeMatrics today for web development, mobile apps, UI/UX design, and digital transformation services. Get a free consultation.',
  keywords: [
    'contact CodeMatrics',
    'IT consultation',
    'web development consultation',
    'mobile app consultation',
    'software development inquiry',
    'project consultation',
    'custom software quote',
    'web design consultation',
    'UI UX design consultation',
    'backend development consultation',
    'full stack development quote',
    'digital transformation consultation',
    'business automation consultation',
    'startup development consultation',
    'enterprise software consultation',
    'e-commerce development quote',
    'React development consultation',
    'Node.js development consultation',
    'mobile app development quote',
    'React Native consultation',
    'Flutter development consultation',
    'database consultation',
    'API development consultation',
    'cloud solutions consultation',
    'performance optimization consultation',
    'SEO consultation',
    'technology consulting',
    'software architecture consultation',
    'MVP development consultation',
    'scalable solutions consultation',
    'microservices consultation',
    'DevOps consultation',
    'IT support services',
    'software maintenance',
    'application support',
    'website maintenance',
    'free IT consultation',
    'project estimation',
    'development timeline',
    'technology recommendations',
    'solution architecture',
    'business requirements analysis',
    'technical feasibility study',
    'cost estimation',
    'project planning',
    'agile development consultation',
    'quality assurance consultation',
    'testing strategy consultation',
    'deployment consultation',
    'integration consultation',
    'third party integrations',
    'payment gateway consultation',
    'CRM integration consultation',
    'ERP consultation',
  ],
  openGraph: {
    title: 'Contact Us - Get Your Project Started | CodeMatrics',
    description:
      'Ready to transform your business with cutting-edge IT solutions? Contact CodeMatrics for web development, mobile apps, and digital transformation.',
    url: 'https://codematrics.com/contact',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact CodeMatrics - Get Your Project Started',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get Your Project Started | CodeMatrics',
    description:
      'Ready to transform your business with cutting-edge IT solutions? Contact CodeMatrics for web development, mobile apps, and digital transformation.',
    images: ['/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
