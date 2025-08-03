import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Our Best Projects & Success Stories | CodeMatrics',
  description:
    'Explore CodeMatrics portfolio of successful web applications, mobile apps, UI/UX designs, and digital solutions. See our proven track record of delivering exceptional results for clients across industries.',
  keywords: [
    'CodeMatrics portfolio',
    'web development projects',
    'mobile app portfolio',
    'UI UX design showcase',
    'software development case studies',
    'successful web applications',
    'custom software projects',
    'React projects portfolio',
    'Node.js applications',
    'full stack projects',
    'e-commerce websites',
    'business applications',
    'startup projects',
    'enterprise solutions',
    'responsive web design',
    'mobile first applications',
    'progressive web apps',
    'React Native apps',
    'Flutter applications',
    'database solutions',
    'API integrations',
    'cloud applications',
    'scalable web apps',
    'modern web design',
    'user experience projects',
    'conversion optimization',
    'performance optimized apps',
    'SEO friendly websites',
    'secure applications',
    'microservices projects',
    'JavaScript applications',
    'TypeScript projects',
    'Python applications',
    'MongoDB projects',
    'PostgreSQL applications',
    'Next.js websites',
    'Vue.js applications',
    'Angular projects',
    'successful IT solutions',
    'digital transformation',
    'business automation',
  ],
  openGraph: {
    title: 'Portfolio - Our Best Projects & Success Stories | CodeMatrics',
    description:
      'Explore CodeMatrics portfolio of successful web applications, mobile apps, UI/UX designs, and digital solutions with proven results.',
    url: 'https://codematrics.com/portfolio',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeMatrics Portfolio - Our Best Projects & Success Stories',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Our Best Projects & Success Stories | CodeMatrics',
    description:
      'Explore CodeMatrics portfolio of successful web applications, mobile apps, UI/UX designs, and digital solutions with proven results.',
    images: ['/og-portfolio.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
