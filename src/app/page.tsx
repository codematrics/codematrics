import BlogSection from '@/components/BlogSection';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  Palette,
  Server,
  Smartphone,
  Star,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CodeMatrics - Premier IT Solutions & Software Development Company',
  description:
    'Transform your business with CodeMatrics cutting-edge IT solutions. Expert web development, mobile app development, UI/UX design, backend development, and digital transformation services. Get custom software solutions that drive growth.',
  keywords: [
    'IT solutions company',
    'software development services',
    'web development company',
    'mobile app development',
    'UI UX design services',
    'backend development',
    'full stack development',
    'custom software development',
    'business automation solutions',
    'digital transformation',
    'React development services',
    'Node.js development',
    'JavaScript development',
    'TypeScript development',
    'Python development',
    'database design',
    'API development',
    'cloud solutions',
    'enterprise software',
    'startup development services',
    'e-commerce development',
    'responsive web design',
    'mobile first design',
    'scalable applications',
    'technology consulting',
    'software consulting',
    'IT consulting services',
    'CodeMatrics India',
    'best IT company India',
    'top software company',
    'reliable IT services',
    'affordable web development',
    'professional mobile apps',
    'modern UI design',
    'user experience design',
    'conversion optimization',
    'performance optimization',
    'SEO friendly development',
    'secure applications',
    'microservices architecture',
    'MongoDB development',
    'PostgreSQL development',
    'Next.js development',
    'React Native development',
    'Flutter development',
  ],
  openGraph: {
    title: 'CodeMatrics - Premier IT Solutions & Software Development Company',
    description:
      'Transform your business with cutting-edge IT solutions. Expert web development, mobile apps, UI/UX design, and backend development services.',
    url: 'https://codematrics.com',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeMatrics - Premier IT Solutions & Software Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeMatrics - Premier IT Solutions & Software Development Company',
    description:
      'Transform your business with cutting-edge IT solutions. Expert web development, mobile apps, UI/UX design, and backend development services.',
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com',
  },
  other: {
    'format-detection': 'telephone=no',
  },
};

const Home = async () => {
  // Fetch latest blog posts
  let blogPosts = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs?status=published&limit=3`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (response.ok) {
      const data = await response.json();
      blogPosts = data.blogs || [];
    }
  } catch {
    // Silently fail if blog fetch fails
  }
  const services = [
    {
      icon: Palette,
      title: 'Web & Graphic Design',
      description:
        'Beautiful, user-centric designs that convert visitors into customers.',
      features: ['UI/UX Design', 'Brand Identity', 'Responsive Layouts'],
    },
    {
      icon: Code,
      title: 'Frontend Development',
      description:
        'Modern, interactive web applications using cutting-edge technologies.',
      features: ['React & Vue.js', 'TypeScript', 'Progressive Web Apps'],
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Robust, scalable server solutions for your business needs.',
      features: ['API Development', 'Database Design', 'Cloud Integration'],
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications.',
      features: ['iOS & Android', 'Flutter', 'React Native'],
    },
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '15+', label: 'Technologies' },
    { number: '3+', label: 'Years Experience' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content:
        'CodeMatrics transformed our digital presence completely. Their attention to detail and technical expertise is outstanding.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCorp',
      content:
        'The mobile app they developed exceeded our expectations. Professional, efficient, and always delivered on time.',
      rating: 5,
    },
  ];

  return (
    <div className='min-h-screen'>
      <Hero />

      {/* Services Overview */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 font-poppins'>
              Our Services
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-4'>
              Comprehensive IT solutions tailored to drive your business forward
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className='group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className='p-4 sm:p-6 text-center'>
                    <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform'>
                      <Icon size={24} className='text-white sm:w-8 sm:h-8' />
                    </div>
                    <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 font-poppins'>
                      {service.title}
                    </h3>
                    <p className='text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed'>
                      {service.description}
                    </p>
                    <ul className='space-y-1 sm:space-y-2'>
                      {service.features.map(feature => (
                        <li
                          key={feature}
                          className='flex items-center text-xs sm:text-sm text-muted-foreground'
                        >
                          <CheckCircle
                            size={16}
                            className='text-primary mr-2 flex-shrink-0'
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className='text-center mt-8 sm:mt-12'>
            <Link href='/services'>
              <Button
                size='lg'
                className='bg-gradient-primary border-0 group w-full sm:w-auto'
              >
                View All Services
                <ArrowRight
                  size={18}
                  className='ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5'
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 font-poppins'>
              Our Technology Stack
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-4'>
              We leverage cutting-edge technologies to deliver robust, scalable,
              and innovative solutions
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {[
              {
                title: 'React & Vue',
                description:
                  'Modern frontend frameworks for dynamic user interfaces',
                href: '/technologies/react-vue',
                icon: Code,
              },
              {
                title: 'Node.js & PHP',
                description:
                  'Powerful backend solutions for scalable applications',
                href: '/technologies/node-php',
                icon: Server,
              },
              {
                title: 'Mobile Development',
                description: 'Native and cross-platform mobile applications',
                href: '/technologies/mobile-development',
                icon: Smartphone,
              },
              {
                title: 'Database Solutions',
                description: 'Efficient data management and optimization',
                href: '/technologies/database-solutions',
                icon: Database,
              },
            ].map(tech => (
              <Link key={tech.title} href={tech.href}>
                <Card className='h-full bg-background border-0 shadow-card hover:shadow-lg transition-all duration-300 group animate-fade-in cursor-pointer'>
                  <CardContent className='p-4 sm:p-6 text-center'>
                    <tech.icon className='h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300' />
                    <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 font-poppins group-hover:text-primary transition-colors'>
                      {tech.title}
                    </h3>
                    <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className='text-center mt-8 sm:mt-12'>
            <Link href='/technologies'>
              <Button
                variant='outline'
                size='lg'
                className='group border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto'
              >
                Explore All Technologies
                <ArrowRight
                  size={20}
                  className='ml-2 group-hover:translate-x-1 transition-transform'
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 sm:py-16 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className='text-center animate-scale-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 font-poppins'>
                  {stat.number}
                </div>
                <div className='text-white/80 text-xs sm:text-sm lg:text-base'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 font-poppins'>
              What Our Clients Say
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto px-4'>
              Don&apos;t just take our word for it - hear from our satisfied
              clients
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto'>
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className='bg-background border-0 shadow-card animate-fade-in'
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className='p-4 sm:p-6 md:p-8'>
                  <div className='flex items-center mb-3 sm:mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className='text-yellow-400 fill-current sm:w-5 sm:h-5'
                      />
                    ))}
                  </div>
                  <p className='text-foreground mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed italic'>
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <div className='font-semibold text-foreground'>
                      {testimonial.name}
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection posts={blogPosts} />

      {/* CTA Section */}
      <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-poppins px-4'>
              Ready to Start Your Project?
            </h2>
            <p className='text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl md:max-w-2xl mx-auto px-4'>
              Let&apos;s discuss your ideas and turn them into reality. Get in
              touch with our team today.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto'>
              <Link href='/contact'>
                <Button
                  size='lg'
                  className='bg-gradient-primary border-0 group w-full sm:w-auto'
                >
                  Get In Touch
                  <ArrowRight
                    size={18}
                    className='ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5'
                  />
                </Button>
              </Link>
              <Link href='/portfolio'>
                <Button
                  variant='outline'
                  size='lg'
                  className='w-full sm:w-auto'
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

export default Home;
