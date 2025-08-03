import BlogsPageClient from '@/components/BlogsPage';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tech Blog - Latest Insights & Tutorials | CodeMatrics',
  description:
    'Stay ahead with CodeMatrics tech blog. Get expert insights on web development, mobile apps, UI/UX design, JavaScript, React, Node.js, and emerging technologies. Learn from industry professionals.',
  keywords: [
    'tech blog',
    'web development blog',
    'software development articles',
    'programming tutorials',
    'JavaScript tutorials',
    'React tutorials',
    'Node.js tutorials',
    'TypeScript guides',
    'Python tutorials',
    'mobile app development',
    'UI UX design tips',
    'frontend development',
    'backend development',
    'full stack tutorials',
    'technology trends',
    'coding best practices',
    'developer resources',
    'programming tips',
    'software engineering',
    'database tutorials',
    'API development guides',
    'responsive design',
    'performance optimization',
    'SEO for developers',
    'modern web technologies',
    'React Native tutorials',
    'Flutter development',
    'MongoDB tutorials',
    'Next.js guides',
    'Vue.js tutorials',
    'Angular tutorials',
    'DevOps tutorials',
    'cloud computing',
    'microservices',
    'software architecture',
    'code reviews',
    'testing strategies',
    'agile development',
    'startup tech',
    'enterprise solutions',
  ],
  openGraph: {
    title: 'Tech Blog - Latest Insights & Tutorials | CodeMatrics',
    description:
      'Stay ahead with expert insights on web development, mobile apps, UI/UX design, and emerging technologies from CodeMatrics professionals.',
    url: 'https://codematrics.com/blog',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeMatrics Tech Blog - Latest Insights & Tutorials',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - Latest Insights & Tutorials | CodeMatrics',
    description:
      'Stay ahead with expert insights on web development, mobile apps, UI/UX design, and emerging technologies from CodeMatrics professionals.',
    images: ['/og-blog.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com/blog',
  },
};

export default function BlogPage() {
  return (
    <main className='min-h-screen bg-background'>
      {/* Hero */}
      <section className='pt-20 pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5'>
        <div className='container text-center max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-poppins'>
            Our Blog
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground mb-8'>
            Insights, tutorials, and the latest trends in web development,
            design, and technology.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className='py-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <BlogsPageClient />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
