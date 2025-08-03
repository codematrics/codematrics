import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import Link from 'next/link';

const MobileApps = () => {
  const features = [
    'Native iOS Development',
    'Native Android Development',
    'Cross-Platform Solutions',
    'App Store Optimization',
    'Push Notifications',
    'Offline Functionality',
    'Payment Integration',
    'Analytics Integration',
  ];

  const technologies = [
    { name: 'React Native', icon: '⚛️' },
    { name: 'Flutter', icon: '💙' },
    { name: 'Swift', icon: '🍏' },
    { name: 'Kotlin', icon: '🤖' },
    { name: 'Expo', icon: '🚀' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Xamarin', icon: '💜' },
    { name: 'Ionic', icon: '⚡' },
  ];

  const appTypes = [
    {
      title: 'Business Apps',
      description: 'Streamline operations with custom business applications',
      icon: '💼',
    },
    {
      title: 'E-commerce Apps',
      description: 'Drive sales with feature-rich shopping experiences',
      icon: '🛒',
    },
    {
      title: 'Social Apps',
      description: 'Connect users with engaging social platforms',
      icon: '👥',
    },
    {
      title: 'Utility Apps',
      description: 'Solve problems with practical utility applications',
      icon: '🔧',
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
            <Smartphone className='h-16 w-16 text-primary' />
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
            Mobile App
            <span className='text-primary block mt-2'>Development</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Transform your ideas into powerful mobile applications that engage
            users and drive business growth across iOS and Android platforms.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild>
              <Link href='/contact'>
                Start Your App
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
              Mobile App Features
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive mobile development services for iOS and Android
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

      {/* App Types Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-card'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Types of Apps We Build
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              From simple utilities to complex enterprise solutions
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {appTypes.map((type, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8 text-center'>
                  <div className='text-5xl mb-4 group-hover:scale-110 transition-transform'>
                    {type.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-foreground mb-4'>
                    {type.title}
                  </h3>
                  <p className='text-muted-foreground'>{type.description}</p>
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
              Latest tools and frameworks for mobile app development
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
            Ready to Launch Your Mobile App?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s turn your mobile app idea into reality with our expert
            development team.
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

export default MobileApps;
