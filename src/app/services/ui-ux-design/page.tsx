import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Palette } from 'lucide-react';
import Link from 'next/link';

const UIUXDesign = () => {
  const features = [
    'User Experience Research',
    'Wireframing & Prototyping',
    'Visual Design',
    'Interaction Design',
    'Usability Testing',
    'Design Systems',
    'Responsive Design',
    'Accessibility Compliance',
  ];

  const tools = [
    { name: 'Figma', icon: '🎨' },
    { name: 'Sketch', icon: '💎' },
    { name: 'Adobe XD', icon: '🔷' },
    { name: 'InVision', icon: '💼' },
    { name: 'Principle', icon: '⚡' },
    { name: 'Framer', icon: '🖼️' },
    { name: 'Zeplin', icon: '📏' },
    { name: 'Marvel', icon: '🎭' },
  ];

  const designTypes = [
    {
      title: 'Web Design',
      description: 'Beautiful and functional website designs',
      icon: '🌐',
    },
    {
      title: 'Mobile Design',
      description: 'Intuitive mobile app user interfaces',
      icon: '📱',
    },
    {
      title: 'Brand Identity',
      description: 'Complete brand identity and logo design',
      icon: '🎯',
    },
    {
      title: 'Design Systems',
      description: 'Scalable design systems and component libraries',
      icon: '🧩',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-primary/5 overflow-hidden'>
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
          <div className='flex items-center justify-center mb-4 sm:mb-6'>
            <Palette className='h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-primary' />
          </div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6'>
            UI/UX
            <span className='text-primary block mt-1 sm:mt-2'>Design</span>
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 px-4'>
            Create exceptional user experiences that delight your customers and
            drive engagement through thoughtful design and user-centered
            approach.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'>
            <Button size='lg' className='w-full sm:w-auto' asChild>
              <Link href='/contact'>
                Start Your Design
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
              </Link>
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto'
              asChild
            >
              <Link href='/portfolio'>View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4'>
              Design Services
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-4'>
              Comprehensive UI/UX design services for digital products
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-4 sm:p-6'>
                  <CheckCircle className='h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform' />
                  <h3 className='font-semibold text-sm sm:text-base text-foreground mb-2'>
                    {feature}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Types Section */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-card'>
        <div className='container mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4'>
              Design Specializations
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-4'>
              From web to mobile, we design it all
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {designTypes.map((type, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-6 sm:p-8 text-center'>
                  <div className='text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform'>
                    {type.icon}
                  </div>
                  <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4'>
                    {type.title}
                  </h3>
                  <p className='text-sm sm:text-base text-muted-foreground'>
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4'>
              Design Tools We Use
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-4'>
              Industry-standard design tools and software
            </p>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6'>
            {tools.map((tool, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-4 sm:p-6 text-center'>
                  <div className='text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform'>
                    {tool.icon}
                  </div>
                  <h3 className='font-semibold text-xs sm:text-sm text-foreground'>
                    {tool.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero'>
        <div className='container mx-auto text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4'>
            Ready to Create Amazing Designs?
          </h2>
          <p className='text-base sm:text-lg text-white mb-6 sm:mb-8 max-w-xl md:max-w-2xl mx-auto px-4'>
            Let&apos;s design user experiences that your customers will love.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto'>
            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto'
              asChild
            >
              <Link href='/contact'>
                Get Started Today
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
              </Link>
            </Button>
            <Button className='border w-full sm:w-auto' size='lg' asChild>
              <Link href='/services'>View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UIUXDesign;
