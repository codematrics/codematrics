import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Globe } from 'lucide-react';
import Link from 'next/link';

const WebDevelopment = () => {
  const features = [
    'Responsive Web Design',
    'Single Page Applications (SPA)',
    'Progressive Web Apps (PWA)',
    'E-commerce Solutions',
    'Content Management Systems',
    'Performance Optimization',
    'SEO Implementation',
    'Cross-browser Compatibility',
  ];

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '🚀' },
    { name: 'Vue.js', icon: '💚' },
    { name: 'Angular', icon: '🔺' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎭' },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description:
        'Understanding your requirements and creating a detailed project roadmap.',
    },
    {
      step: '02',
      title: 'Design & Prototype',
      description:
        'Creating wireframes and interactive prototypes for user validation.',
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building your web application with clean, scalable code.',
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Comprehensive testing and smooth deployment to production.',
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
            <Globe className='h-16 w-16 text-primary' />
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
            Web Development
            <span className='text-primary block mt-2'>Excellence</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Create powerful, scalable web applications that engage users and
            drive business growth. From simple websites to complex web
            platforms, we deliver solutions that perform.
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
              What We Deliver
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive web development services tailored to your business
              needs
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
              Technologies We Use
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Cutting-edge tools and frameworks for modern web development
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

      {/* Process Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Our Development Process
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              A proven methodology that ensures quality and timely delivery
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {process.map((step, index) => (
              <Card
                key={index}
                className='relative group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8 text-center'>
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'>
                      {step.step}
                    </div>
                  </div>
                  <div className='mt-8'>
                    <h3 className='text-xl font-semibold text-foreground mb-4'>
                      {step.title}
                    </h3>
                    <p className='text-muted-foreground'>{step.description}</p>
                  </div>
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
            Ready to Build Your Web Application?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s discuss your project requirements and create something
            amazing together.
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

export default WebDevelopment;
