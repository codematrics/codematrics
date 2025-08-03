import { Card, CardContent } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technologies & Tech Stack - Modern Development Tools | CodeMatrics',
  description:
    'Discover CodeMatrics comprehensive technology stack. We use cutting-edge frontend, backend, mobile, and database technologies including React, Node.js, Python, MongoDB, and more to build scalable solutions.',
  keywords: [
    'technology stack',
    'web development technologies',
    'frontend technologies',
    'backend technologies',
    'mobile development stack',
    'database technologies',
    'React development',
    'Vue.js development',
    'Angular development',
    'Node.js backend',
    'Python development',
    'PHP development',
    'JavaScript frameworks',
    'TypeScript development',
    'HTML5 CSS3',
    'responsive frameworks',
    'Bootstrap framework',
    'Tailwind CSS',
    'Sass SCSS',
    'MongoDB database',
    'PostgreSQL database',
    'MySQL database',
    'Firebase backend',
    'AWS cloud services',
    'Google Cloud Platform',
    'Microsoft Azure',
    'React Native mobile',
    'Flutter development',
    'iOS development',
    'Android development',
    'Progressive Web Apps',
    'API development',
    'RESTful services',
    'GraphQL APIs',
    'Microservices architecture',
    'Docker containers',
    'Kubernetes orchestration',
    'CI/CD pipelines',
    'Git version control',
    'Agile methodologies',
    'DevOps practices',
    'Testing frameworks',
    'Jest testing',
    'Cypress testing',
    'Selenium automation',
    'modern web technologies',
    'enterprise technologies',
    'scalable architectures',
    'performance optimization',
    'security best practices',
  ],
  openGraph: {
    title: 'Technologies & Tech Stack - Modern Development Tools | CodeMatrics',
    description:
      'Discover CodeMatrics comprehensive technology stack with cutting-edge frontend, backend, mobile, and database technologies for scalable solutions.',
    url: 'https://codematrics.com/technologies',
    siteName: 'CodeMatrics',
    images: [
      {
        url: '/og-technologies.jpg',
        width: 1200,
        height: 630,
        alt: 'CodeMatrics Technologies & Tech Stack',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technologies & Tech Stack - Modern Development Tools | CodeMatrics',
    description:
      'Discover CodeMatrics comprehensive technology stack with cutting-edge frontend, backend, mobile, and database technologies for scalable solutions.',
    images: ['/og-technologies.jpg'],
  },
  alternates: {
    canonical: 'https://codematrics.com/technologies',
  },
};

const Technologies = () => {
  const techCategories = [
    {
      title: 'Frontend Technologies',
      description:
        'Modern client-side technologies for creating interactive user interfaces',
      color: 'from-blue-500 to-purple-600',
      technologies: [
        { name: 'HTML5', description: 'Semantic markup language', icon: '🌐' },
        {
          name: 'CSS3',
          description: 'Advanced styling and animations',
          icon: '🎨',
        },
        {
          name: 'JavaScript',
          description: 'Dynamic programming language',
          icon: '⚡',
        },
        {
          name: 'jQuery',
          description: 'JavaScript library for DOM manipulation',
          icon: '📚',
        },
        {
          name: 'ReactJS',
          description: 'Component-based UI library',
          icon: '⚛️',
        },
        {
          name: 'Vue.js',
          description: 'Progressive JavaScript framework',
          icon: '💚',
        },
        {
          name: 'TypeScript',
          description: 'Typed JavaScript superset',
          icon: '📘',
        },
      ],
    },
    {
      title: 'Backend Technologies',
      description:
        'Server-side technologies for robust application logic and APIs',
      color: 'from-green-500 to-blue-600',
      technologies: [
        {
          name: 'PHP',
          description: 'Server-side scripting language',
          icon: '🐘',
        },
        {
          name: 'Laravel',
          description: 'PHP web application framework',
          icon: '🔴',
        },
        {
          name: 'Node.js',
          description: 'JavaScript runtime environment',
          icon: '🟢',
        },
        {
          name: 'Express.js',
          description: 'Minimal Node.js web framework',
          icon: '🚀',
        },
      ],
    },
    {
      title: 'Mobile Development',
      description: 'Cross-platform and native mobile application development',
      color: 'from-purple-500 to-pink-600',
      technologies: [
        {
          name: 'Android',
          description: 'Native Android development',
          icon: '🤖',
        },
        { name: 'iOS', description: 'Native iOS development', icon: '🍎' },
        {
          name: 'Flutter',
          description: 'Cross-platform mobile framework',
          icon: '🦋',
        },
        {
          name: 'Kotlin',
          description: 'Modern Android programming language',
          icon: '🔷',
        },
        {
          name: 'React Native',
          description: 'Cross-platform mobile development',
          icon: '📱',
        },
      ],
    },
    {
      title: 'Database & Cloud',
      description: 'Data storage solutions and cloud infrastructure services',
      color: 'from-orange-500 to-red-600',
      technologies: [
        {
          name: 'MySQL',
          description: 'Relational database management system',
          icon: '🐬',
        },
        {
          name: 'PostgreSQL',
          description: 'Advanced open-source database',
          icon: '🐘',
        },
        {
          name: 'SQLite',
          description: 'Lightweight embedded database',
          icon: '💾',
        },
        { name: 'MongoDB', description: 'NoSQL document database', icon: '🍃' },
        {
          name: 'Firebase',
          description: 'Google cloud platform services',
          icon: '🔥',
        },
        { name: 'SQL', description: 'Structured Query Language', icon: '📊' },
      ],
    },
  ];

  const developmentTools = [
    { name: 'Git', description: 'Version control system', icon: '📝' },
    { name: 'Docker', description: 'Containerization platform', icon: '🐳' },
    { name: 'AWS', description: 'Amazon Web Services', icon: '☁️' },
    { name: 'VS Code', description: 'Code editor', icon: '💻' },
    { name: 'Postman', description: 'API testing tool', icon: '📮' },
    { name: 'Figma', description: 'Design collaboration tool', icon: '🎨' },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900  pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in-up'>
              Technologies We Use
            </h1>
            <p
              className='text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in'
              style={{ animationDelay: '0.2s' }}
            >
              Cutting-edge technology stack to build robust, scalable, and
              modern applications
            </p>
          </div>
        </div>
      </section>

      {/* Technology Categories */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-16'>
            {techCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className='animate-fade-in-up'
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                {/* Category Header */}
                <div className='text-center mb-12'>
                  <div
                    className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}
                  >
                    <h2 className='text-2xl lg:text-3xl font-bold text-white font-poppins'>
                      {category.title}
                    </h2>
                  </div>
                  <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                    {category.description}
                  </p>
                </div>

                {/* Technologies Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {category.technologies.map((tech, techIndex) => (
                    <Card
                      key={tech.name}
                      className='group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card animate-scale-in'
                      style={{
                        animationDelay: `${categoryIndex * 0.1 + techIndex * 0.05}s`,
                      }}
                    >
                      <CardContent className='p-6 text-center'>
                        <div className='text-4xl mb-4 group-hover:scale-110 transition-transform'>
                          {tech.icon}
                        </div>
                        <h3 className='text-lg font-semibold text-foreground mb-2 font-poppins'>
                          {tech.name}
                        </h3>
                        <p className='text-muted-foreground text-sm leading-relaxed'>
                          {tech.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Tools */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Development Tools & Platforms
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Professional tools and platforms that enhance our development
              workflow
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
            {developmentTools.map((tool, index) => (
              <Card
                key={tool.name}
                className='group hover:shadow-card transition-all duration-300 border-0 bg-background animate-fade-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='p-6 text-center'>
                  <div className='text-3xl mb-3 group-hover:scale-110 transition-transform'>
                    {tool.icon}
                  </div>
                  <h3 className='font-semibold text-foreground mb-1 font-poppins text-sm'>
                    {tool.name}
                  </h3>
                  <p className='text-muted-foreground text-xs'>
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Approach */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='animate-fade-in-up'>
              <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6 font-poppins'>
                Our Technology Approach
              </h2>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0'>
                    <span className='text-white text-sm font-bold'>1</span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Modern & Scalable
                    </h3>
                    <p className='text-muted-foreground'>
                      We choose technologies that grow with your business and
                      maintain long-term sustainability.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0'>
                    <span className='text-white text-sm font-bold'>2</span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Performance Focused
                    </h3>
                    <p className='text-muted-foreground'>
                      Every technology choice is made with performance,
                      security, and user experience in mind.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0'>
                    <span className='text-white text-sm font-bold'>3</span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Industry Standards
                    </h3>
                    <p className='text-muted-foreground'>
                      We follow best practices and industry standards to ensure
                      code quality and maintainability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='animate-scale-in'
              style={{ animationDelay: '0.3s' }}
            >
              <Card className='bg-gradient-card border-0 shadow-card'>
                <CardContent className='p-8'>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary mb-2 font-poppins'>
                        15+
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Technologies Mastered
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary mb-2 font-poppins'>
                        5+
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Years Experience
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary mb-2 font-poppins'>
                        50+
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Projects Delivered
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-primary mb-2 font-poppins'>
                        24/7
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Tech Support
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 lg:py-24 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6 font-poppins'>
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto opacity-90'>
              Ready to leverage these technologies for your next project? Get in
              touch with our expert team.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a href='/contact' className='inline-block'>
                <button className='bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-hero'>
                  Start Your Project
                </button>
              </a>
              <a href='/services' className='inline-block'>
                <button className='border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors'>
                  View Our Services
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technologies;
