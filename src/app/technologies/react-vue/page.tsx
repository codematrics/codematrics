import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Code } from 'lucide-react';
import Link from 'next/link';

const ReactVue = () => {
  const features = [
    'Component-Based Architecture',
    'State Management',
    'Single Page Applications',
    'Progressive Web Apps',
    'Server-Side Rendering',
    'TypeScript Integration',
    'Testing & Quality Assurance',
    'Performance Optimization',
  ];

  const frameworks = [
    {
      name: 'React',
      version: '18+',
      icon: '⚛️',
      description: 'Popular JavaScript library for building user interfaces',
    },
    {
      name: 'Vue.js',
      version: '3+',
      icon: '💚',
      description: 'Progressive framework for building user interfaces',
    },
    {
      name: 'Next.js',
      version: '15+',
      icon: '🚀',
      description: 'React framework for production applications',
    },
    {
      name: 'Nuxt.js',
      version: '3+',
      icon: '💚',
      description: 'Vue.js framework for full-stack applications',
    },
  ];

  const libraries = [
    'React Router',
    'Vuex/Pinia',
    'Redux Toolkit',
    'Material-UI',
    'Vuetify',
    'Ant Design',
    'Chakra UI',
    'React Query',
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
            <Code className='h-16 w-16 text-primary' />
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
            React & Vue
            <span className='text-primary block mt-2'>Development</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Build modern, interactive web applications using React and Vue.js -
            the leading JavaScript frameworks for creating dynamic user
            interfaces.
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
              What We Offer
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive React and Vue.js development services
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

      {/* Frameworks Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-card'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Frameworks We Specialize In
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Latest versions of popular JavaScript frameworks
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {frameworks.map((framework, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-8'>
                  <div className='flex items-center mb-4'>
                    <div className='text-4xl mr-4 group-hover:scale-110 transition-transform'>
                      {framework.icon}
                    </div>
                    <div>
                      <h3 className='text-2xl font-semibold text-foreground'>
                        {framework.name}
                      </h3>
                      <p className='text-sm text-primary'>
                        {framework.version}
                      </p>
                    </div>
                  </div>
                  <p className='text-muted-foreground'>
                    {framework.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Libraries Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Libraries & Tools
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Essential libraries and tools in our React & Vue ecosystem
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {libraries.map((library, index) => (
              <Card
                key={index}
                className='group hover:shadow-lg transition-all duration-300'
              >
                <CardContent className='p-6 text-center'>
                  <h3 className='font-semibold text-foreground'>{library}</h3>
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
            Ready to Build with React or Vue?
          </h2>
          <p className='text-lg text-white mb-8 max-w-2xl mx-auto'>
            Let&apos;s create modern, performant web applications using these
            powerful frameworks.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button variant='outline' size='lg' asChild>
              <Link href='/contact'>
                Get Started Today
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button size='lg' className='border' asChild>
              <Link href='/technologies'>View All Technologies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReactVue;
