import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Server } from 'lucide-react';
import Link from 'next/link';

const NodePHP = () => {
  const features = [
    'RESTful API Development',
    'Real-time Applications',
    'Database Integration',
    'Authentication Systems',
    'Payment Processing',
    'Third-party Integrations',
    'Performance Optimization',
    'Security Implementation',
  ];

  const technologies = [
    {
      name: 'Node.js',
      icon: '🟢',
      description: 'JavaScript runtime for server-side development',
      frameworks: ['Express.js', 'Fastify', 'NestJS', 'Koa.js'],
    },
    {
      name: 'PHP',
      icon: '🐘',
      description: 'Popular server-side scripting language',
      frameworks: ['Laravel', 'Symfony', 'CodeIgniter', 'Zend'],
    },
  ];

  const databases = [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'SQLite',
    'MariaDB',
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
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
            <Server className='h-16 w-16 text-primary' />
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
            Node.js & PHP
            <span className='text-primary block mt-2'>Development</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Power your applications with robust server-side solutions using
            Node.js and PHP - proven technologies for scalable backend systems.
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

      {/* Features Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Backend Solutions
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive server-side development with Node.js and PHP
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

      {/* Technologies Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-card'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Technologies We Master
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Server-side technologies and their popular frameworks
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8'>
                  <div className='flex items-center mb-4'>
                    <div className='text-4xl mr-4 group-hover:scale-110 transition-transform'>
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className='text-2xl font-semibold text-foreground'>
                        {tech.name}
                      </h3>
                    </div>
                  </div>
                  <p className='text-muted-foreground mb-4'>
                    {tech.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {tech.frameworks.map((framework, fIndex) => (
                      <span
                        key={fIndex}
                        className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Databases Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Database Solutions
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Databases we work with for optimal data management
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
            {databases.map((db, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-6 text-center'>
                  <h3 className='font-semibold text-foreground'>{db}</h3>
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
            Need Powerful Backend Solutions?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s build robust server-side applications with Node.js or
            PHP.
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

export default NodePHP;
