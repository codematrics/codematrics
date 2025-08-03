import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Server } from 'lucide-react';
import Link from 'next/link';

const BackendDevelopment = () => {
  const features = [
    'RESTful API Development',
    'GraphQL Implementation',
    'Database Design & Optimization',
    'Cloud Infrastructure',
    'Authentication & Security',
    'Microservices Architecture',
    'Performance Optimization',
    'Third-party Integrations',
  ];

  const technologies = [
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Java', icon: '☕' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis', icon: '🔴' },
    { name: 'Docker', icon: '🐳' },
  ];

  const services = [
    {
      title: 'API Development',
      description: 'Robust and scalable APIs for your applications',
      icon: '🔗',
    },
    {
      title: 'Database Design',
      description: 'Efficient database architecture and optimization',
      icon: '💾',
    },
    {
      title: 'Cloud Deployment',
      description: 'Scalable cloud infrastructure and deployment',
      icon: '☁️',
    },
    {
      title: 'Security Implementation',
      description: 'Enterprise-grade security and data protection',
      icon: '🔒',
    },
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
            Backend
            <span className='text-primary block mt-2'>Development</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Build robust, scalable server-side solutions that power your
            applications with enterprise-grade performance and security.
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
              Comprehensive server-side development services
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

      {/* Services Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-card'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Our Backend Services
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              From APIs to cloud infrastructure
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {services.map((service, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8 text-center'>
                  <div className='text-5xl mb-4 group-hover:scale-110 transition-transform'>
                    {service.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-foreground mb-4'>
                    {service.title}
                  </h3>
                  <p className='text-muted-foreground'>{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Technologies We Use
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Modern backend technologies and frameworks
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6'>
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-6 text-center'>
                  <div className='text-4xl mb-3 group-hover:scale-110 transition-transform'>
                    {tech.icon}
                  </div>
                  <h3 className='font-semibold text-sm text-foreground'>
                    {tech.name}
                  </h3>
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
            Need Robust Backend Solutions?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s build scalable server-side infrastructure for your
            application.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button variant='outline' size='lg' asChild>
              <Link href='/contact'>
                Get Started Today
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button className='border' size='lg' asChild>
              <Link href='/services'>View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackendDevelopment;
