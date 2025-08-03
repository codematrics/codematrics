import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import Link from 'next/link';

const MobileDevelopment = () => {
  const features = [
    'Cross-Platform Development',
    'Native Performance',
    'Offline Functionality',
    'Push Notifications',
    'Device Integration',
    'App Store Deployment',
    'Performance Optimization',
    'Security Implementation',
  ];

  const platforms = [
    {
      name: 'React Native',
      icon: '⚛️',
      description: 'Build native apps using React',
    },
    {
      name: 'Flutter',
      icon: '💙',
      description: "Google's UI toolkit for mobile",
    },
    {
      name: 'Ionic',
      icon: '⚡',
      description: 'Hybrid mobile app development',
    },
    {
      name: 'Xamarin',
      icon: '💜',
      description: "Microsoft's mobile platform",
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
            Mobile
            <span className='text-primary block mt-2'>Development</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Create powerful mobile applications for iOS and Android using modern
            cross-platform technologies.
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
              Mobile Solutions
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive mobile development services
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
              Development Platforms
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Modern frameworks for mobile app development
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {platforms.map((platform, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8 text-center'>
                  <div className='text-5xl mb-4 group-hover:scale-110 transition-transform'>
                    {platform.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-foreground mb-4'>
                    {platform.name}
                  </h3>
                  <p className='text-muted-foreground'>
                    {platform.description}
                  </p>
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
            Need Innovative Mobile Solutions?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s create powerful mobile applications that engage your
            users across all platforms.
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

export default MobileDevelopment;
