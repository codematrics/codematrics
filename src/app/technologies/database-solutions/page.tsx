import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Database } from 'lucide-react';
import Link from 'next/link';

const DatabaseSolutions = () => {
  const features = [
    'Database Design',
    'Performance Optimization',
    'Data Migration',
    'Backup & Recovery',
    'Security Implementation',
    'Scalability Planning',
    'Real-time Analytics',
    'Cloud Integration',
  ];

  const databases = [
    {
      name: 'MongoDB',
      type: 'NoSQL',
      icon: '🍃',
      description: 'Document-based database for flexible data models',
    },
    {
      name: 'PostgreSQL',
      type: 'SQL',
      icon: '🐘',
      description: 'Advanced open-source relational database',
    },
    {
      name: 'MySQL',
      type: 'SQL',
      icon: '🐬',
      description: 'Popular relational database management system',
    },
    {
      name: 'Redis',
      type: 'Cache',
      icon: '🔴',
      description: 'In-memory data structure store',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <section className='relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary/5 overflow-hidden'>
        {/* Dot Pattern Background */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage:
                'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>
        <div className='container mx-auto text-center relative z-10'>
          <div className='flex items-center justify-center mb-6'>
            <Database className='h-16 w-16 text-primary' />
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
            Database
            <span className='text-primary block mt-2'>Solutions</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Design, implement, and optimize database solutions that scale with
            your business needs.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild>
              <Link href='/contact'>
                Start Your Project
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='/portfolio'>View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Database Services
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive database solutions and services
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-6'>
                  <CheckCircle className='h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform' />
                  <h3 className='font-semibold text-foreground mb-2'>
                    {feature}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-card'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Database Technologies
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Modern database solutions we specialize in
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {databases.map((db, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8'>
                  <div className='flex items-center mb-4'>
                    <div className='text-4xl mr-4 group-hover:scale-110 transition-transform'>
                      {db.icon}
                    </div>
                    <div>
                      <h3 className='text-2xl font-semibold text-foreground'>
                        {db.name}
                      </h3>
                      <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'>
                        {db.type}
                      </span>
                    </div>
                  </div>
                  <p className='text-muted-foreground'>{db.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-white mb-6'>
            Need Scalable Database Solutions?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s design and implement efficient database architectures
            that power your applications with speed and reliability.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' variant='outline' asChild>
              <Link href='/contact'>
                Get Started Today
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button className='border' size='lg' asChild>
              <Link href='/technologies'>View All Technologies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DatabaseSolutions;
