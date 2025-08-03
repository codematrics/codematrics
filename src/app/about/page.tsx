import { Card, CardContent } from '@/components/ui/card';
import {
  Award,
  Clock,
  Eye,
  Lightbulb,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About CodeMatrics - Your Trusted IT Solutions Partner',
  description:
    'Learn about CodeMatrics - a leading IT solutions company dedicated to transforming businesses through innovative web development, mobile apps, and digital solutions. Discover our mission, values, and commitment to excellence.',
  keywords: [
    'about CodeMatrics',
    'IT solutions company',
    'software development company',
    'web development company',
    'mobile app development company',
    'digital transformation company',
    'technology solutions provider',
    'custom software development',
    'business automation company',
    'enterprise software company',
    'startup development company',
    'full stack development company',
    'React development company',
    'Node.js development company',
    'UI UX design company',
    'backend development company',
    'cloud solutions provider',
    'database solutions company',
    'API development company',
    'e-commerce development company',
    'responsive web design company',
    'mobile first development',
    'scalable applications',
    'microservices development',
    'DevOps services company',
    'quality assurance company',
    'performance optimization',
    'security implementation',
    'testing services company',
    'maintenance support',
    'IT consulting services',
    'technology consulting',
    'software consulting',
    'business requirements analysis',
    'technical feasibility study',
    'solution architecture',
    'project management',
    'agile development',
    'innovation in technology',
    'cutting edge solutions',
    'modern web technologies',
    'enterprise technologies',
    'startup technologies',
    'reliable IT services',
    'trusted technology partner',
    'experienced developers',
    'skilled programmers',
    'professional team',
    'dedicated support',
    'client satisfaction',
    'proven track record',
    'successful projects',
    'industry expertise',
    'technical excellence',
    'commitment to quality',
    'timely delivery',
    'cost effective solutions',
    'competitive pricing',
    'transparent process',
    'collaborative approach',
    'customer focused',
  ],
  openGraph: {
    title: 'About CodeMatrics - Your Trusted IT Solutions Partner',
    description:
      'Learn about CodeMatrics - a leading IT solutions company transforming businesses through innovative web development, mobile apps, and digital solutions.',
    url: 'https://codematrics.com/about',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About CodeMatrics - Your Trusted IT Solutions Partner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CodeMatrics - Your Trusted IT Solutions Partner',
    description:
      'Learn about CodeMatrics - a leading IT solutions company transforming businesses through innovative web development, mobile apps, and digital solutions.',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com/about',
  },
};

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'We stay at the forefront of technology, constantly learning and implementing the latest solutions.',
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description:
        'Every line of code is tested and optimized to ensure reliability and performance.',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description:
        'We respect deadlines and deliver projects on time without compromising quality.',
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description:
        'Your success is our priority. We build lasting partnerships through excellent service.',
    },
  ];

  const teamStats = [
    { icon: Users, number: '10+', label: 'Team Members' },
    { icon: Award, number: '50+', label: 'Projects Completed' },
    { icon: TrendingUp, number: '98%', label: 'Client Satisfaction' },
    { icon: Clock, number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900  pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in-up'>
              About CodeMatrics
            </h1>
            <p
              className='text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in'
              style={{ animationDelay: '0.2s' }}
            >
              Empowering businesses through innovative technology solutions and
              exceptional digital experiences
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='animate-fade-in-up'>
              <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6 font-poppins'>
                Who We Are
              </h2>
              <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                CodeMatrics is a forward-thinking IT services company dedicated
                to transforming businesses through cutting-edge technology
                solutions. Founded with a vision to bridge the gap between
                complex technology and practical business needs.
              </p>
              <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                Our team of experienced developers, designers, and strategists
                work collaboratively to deliver custom software solutions that
                drive growth, efficiency, and innovation for our clients across
                various industries.
              </p>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                From startups to enterprise-level organizations, we&apos;ve
                helped businesses leverage technology to achieve their goals and
                stay competitive in the digital landscape.
              </p>
            </div>

            <div
              className='relative animate-scale-in'
              style={{ animationDelay: '0.3s' }}
            >
              <div className='bg-gradient-card rounded-2xl p-8 shadow-card'>
                <div className='grid grid-cols-2 gap-6'>
                  {teamStats.map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className='text-center'>
                        <Icon size={32} className='text-primary mx-auto mb-3' />
                        <div className='text-2xl font-bold text-foreground mb-1 font-poppins'>
                          {stat.number}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Mission */}
            <Card className='bg-background border-0 shadow-card animate-fade-in-up'>
              <CardContent className='p-8'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4'>
                    <Target size={24} className='text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-foreground font-poppins'>
                    Our Mission
                  </h3>
                </div>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  To empower businesses by delivering innovative, scalable, and
                  reliable technology solutions that drive digital
                  transformation and sustainable growth. We strive to be the
                  trusted technology partner that turns ideas into reality.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card
              className='bg-background border-0 shadow-card animate-fade-in-up'
              style={{ animationDelay: '0.2s' }}
            >
              <CardContent className='p-8'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4'>
                    <Eye size={24} className='text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-foreground font-poppins'>
                    Our Vision
                  </h3>
                </div>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  To be a globally recognized leader in innovative technology
                  solutions, known for our expertise, integrity, and commitment
                  to excellence. We envision a future where technology
                  seamlessly enhances every business operation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose CodeMatrics */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Why Choose CodeMatrics?
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Our core values and commitment to excellence set us apart
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className='group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className='p-6 text-center'>
                    <div className='w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                      <Icon size={32} className='text-white' />
                    </div>
                    <h3 className='text-xl font-semibold text-foreground mb-3 font-poppins'>
                      {value.title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 lg:py-24 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6 font-poppins'>
              Ready to Work With Us?
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto opacity-90'>
              Let&apos;s discuss how we can help transform your business with
              innovative technology solutions.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/contact' className='inline-block'>
                <button className='bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-hero'>
                  Get Started Today
                </button>
              </Link>
              <Link href='/portfolio' className='inline-block'>
                <button className='border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors'>
                  View Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
