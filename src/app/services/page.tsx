import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  Globe,
  Palette,
  Server,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'IT Services - Complete Digital Solutions | CodeMatrics',
  description:
    'CodeMatrics offers comprehensive IT services including web development, mobile app development, UI/UX design, backend development, and digital transformation. Get end-to-end solutions for your business growth.',
  keywords: [
    'IT services company',
    'digital solutions provider',
    'web development services',
    'mobile app development services',
    'UI UX design services',
    'backend development services',
    'full stack development',
    'custom software development',
    'e-commerce development',
    'business website development',
    'responsive web design',
    'mobile first design',
    'user experience design',
    'user interface design',
    'brand identity design',
    'logo design services',
    'wireframing prototyping',
    'React development services',
    'Vue.js development',
    'Angular development',
    'Node.js backend services',
    'Python development',
    'PHP development',
    'database design services',
    'API development',
    'RESTful API services',
    'GraphQL development',
    'cloud solutions',
    'AWS services',
    'Azure services',
    'Google Cloud services',
    'React Native development',
    'Flutter development',
    'iOS app development',
    'Android app development',
    'Progressive Web Apps',
    'PWA development',
    'cross platform apps',
    'native mobile apps',
    'hybrid mobile apps',
    'enterprise software',
    'startup development',
    'MVP development',
    'scalable applications',
    'microservices architecture',
    'DevOps services',
    'CI/CD implementation',
    'performance optimization',
    'SEO optimization',
    'security implementation',
    'quality assurance',
    'testing services',
    'maintenance support',
    'digital transformation',
    'business automation',
    'workflow optimization',
    'integration services',
    'third party integrations',
    'payment gateway integration',
    'social media integration',
    'CRM integration',
    'ERP solutions',
  ],
  openGraph: {
    title: 'IT Services - Complete Digital Solutions | CodeMatrics',
    description:
      'CodeMatrics offers comprehensive IT services including web development, mobile apps, UI/UX design, and digital transformation for business growth.',
    url: 'https://codematrics.com/services',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeMatrics IT Services - Complete Digital Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services - Complete Digital Solutions | CodeMatrics',
    description:
      'CodeMatrics offers comprehensive IT services including web development, mobile apps, UI/UX design, and digital transformation for business growth.',
    images: ['/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com/services',
  },
};

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Web & Graphic Design',
      description:
        'Create stunning visual experiences that captivate your audience and drive conversions.',
      features: [
        'UI/UX Design',
        'Brand Identity & Logo Design',
        'Responsive Web Design',
        'Wireframing & Prototyping',
        'User Experience Optimization',
        'Design System Creation',
      ],
      technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision'],
      price: 'Starting from $1,500',
    },
    {
      icon: Code,
      title: 'Frontend Development',
      description:
        'Build modern, interactive web applications with cutting-edge technologies and best practices.',
      features: [
        'React & Vue.js Development',
        'TypeScript Implementation',
        'Progressive Web Apps (PWA)',
        'Single Page Applications (SPA)',
        'Performance Optimization',
        'Cross-browser Compatibility',
      ],
      technologies: [
        'React',
        'Vue.js',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
      ],
      price: 'Starting from $2,500',
    },
    {
      icon: Server,
      title: 'Backend Development',
      description:
        'Robust, scalable server-side solutions that power your applications and handle complex business logic.',
      features: [
        'API Development & Integration',
        'Database Design & Management',
        'Cloud Infrastructure Setup',
        'Authentication & Security',
        'Performance Optimization',
        'Microservices Architecture',
      ],
      technologies: [
        'Node.js',
        'PHP',
        'Laravel',
        'Express.js',
        'MySQL',
        'MongoDB',
      ],
      price: 'Starting from $3,000',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description:
        'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      features: [
        'iOS & Android Development',
        'Cross-platform Solutions',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'App Maintenance & Updates',
      ],
      technologies: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase'],
      price: 'Starting from $5,000',
    },
  ];

  const additionalServices = [
    {
      icon: Globe,
      title: 'E-commerce Solutions',
      description:
        'Complete online store development with payment integration and inventory management.',
    },
    {
      icon: Database,
      title: 'Database Management',
      description:
        'Optimize and maintain your data infrastructure for maximum performance and security.',
    },
    {
      icon: Shield,
      title: 'Security Consulting',
      description:
        'Comprehensive security audits and implementation of best practices to protect your assets.',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description:
        'Speed up your applications and improve user experience with advanced optimization techniques.',
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900  pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in-up'>
              Our Services
            </h1>
            <p
              className='text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in'
              style={{ animationDelay: '0.2s' }}
            >
              Comprehensive IT solutions designed to accelerate your business
              growth and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-16'>
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div
                    className={`animate-fade-in-up ${!isEven ? 'lg:col-start-2' : ''}`}
                  >
                    <div className='flex items-center mb-6'>
                      <div className='w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mr-4'>
                        <Icon size={32} className='text-white' />
                      </div>
                      <div>
                        <h3 className='text-2xl lg:text-3xl font-bold text-foreground font-poppins'>
                          {service.title}
                        </h3>
                        <p className='text-primary font-semibold mt-1'>
                          {service.price}
                        </p>
                      </div>
                    </div>

                    <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                      {service.description}
                    </p>

                    <div className='mb-6'>
                      <h4 className='font-semibold text-foreground mb-3'>
                        What&apos;s Included:
                      </h4>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        {service.features.map(feature => (
                          <div key={feature} className='flex items-center'>
                            <CheckCircle
                              size={16}
                              className='text-primary mr-2 flex-shrink-0'
                            />
                            <span className='text-sm text-muted-foreground'>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='mb-8'>
                      <h4 className='font-semibold text-foreground mb-3'>
                        Technologies Used:
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {service.technologies.map(tech => (
                          <span
                            key={tech}
                            className='px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href='/contact'>
                      <Button
                        size='lg'
                        className='bg-gradient-primary border-0 group'
                      >
                        Get Started
                        <ArrowRight
                          size={20}
                          className='ml-2 group-hover:translate-x-1 transition-transform'
                        />
                      </Button>
                    </Link>
                  </div>

                  {/* Visual */}
                  <Card
                    className={`bg-gradient-card border-0 shadow-card animate-scale-in ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    style={{ animationDelay: '0.3s' }}
                  >
                    <CardContent className='p-8'>
                      <div className='w-full h-64 bg-gradient-primary/10 rounded-lg flex items-center justify-center'>
                        <Icon size={80} className='text-primary' />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Additional Services
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive solutions to support your entire technology
              ecosystem
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className='bg-background border-0 shadow-card hover:shadow-hero transition-all duration-300 group animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className='p-6 text-center'>
                    <div className='w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                      <Icon size={32} className='text-white' />
                    </div>
                    <h3 className='text-xl font-semibold text-foreground mb-3 font-poppins'>
                      {service.title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Our Development Process
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              A proven methodology that ensures quality delivery and client
              satisfaction
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                step: '01',
                title: 'Discovery & Planning',
                description:
                  'We analyze your requirements, define project scope, and create detailed technical specifications.',
              },
              {
                step: '02',
                title: 'Design & Development',
                description:
                  'Our team designs and develops your solution using agile methodologies and best practices.',
              },
              {
                step: '03',
                title: 'Testing & Deployment',
                description:
                  'Comprehensive testing ensures quality before deployment and ongoing support post-launch.',
              },
            ].map((process, index) => (
              <div
                key={process.step}
                className='text-center animate-fade-in-up'
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className='w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl'>
                  {process.step}
                </div>
                <h3 className='text-xl font-semibold text-foreground mb-3 font-poppins'>
                  {process.title}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 lg:py-24 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6 font-poppins'>
              Ready to Start Your Project?
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto opacity-90'>
              Let&apos;s discuss your requirements and provide a custom solution
              tailored to your business needs.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/contact'>
                <Button
                  size='lg'
                  className='bg-white text-primary hover:bg-white/90 shadow-hero'
                >
                  Get Free Consultation
                </Button>
              </Link>
              <Link href='/portfolio'>
                <Button
                  variant='outline'
                  size='lg'
                  className='border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent hover:text-white'
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
