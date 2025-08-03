'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Filter, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  status: string;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?status=published');
        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects || []);

          // Extract unique categories from projects
          const uniqueCategories = Array.from(
            new Set((data.projects || []).map((p: Project) => p.category))
          ) as string[];
          setCategories(uniqueCategories);
        } else {
          // Failed to fetch projects
        }
      } catch {
        // Error fetching projects
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const trackProjectView = async (projectSlug: string) => {
    try {
      await fetch(`/api/projects/${projectSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incrementView: true }),
      });
    } catch {
      // Silent error handling for view tracking
    }
  };

  const handleProjectClick = (project: Project, url?: string) => {
    trackProjectView(project.slug);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Navigate to project detail page
      window.location.href = `/portfolio/${project.slug}`;
    }
  };

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  const filteredProjects =
    activeFilter === 'all'
      ? regularProjects
      : regularProjects.filter(project => project.category === activeFilter);

  const filters = [
    { id: 'all', name: 'All Projects' },
    ...categories.map(category => ({ id: category, name: category })),
  ];

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4' />
          <p className='text-muted-foreground'>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in-up'>
              Our Portfolio
            </h1>
            <p
              className='text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in'
              style={{ animationDelay: '0.2s' }}
            >
              Showcase of successful projects and innovative solutions
              we&apos;ve delivered for our clients
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className='py-16 lg:py-24 bg-background'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
                Featured Projects
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                Our most successful and innovative projects that showcase our
                expertise
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
              {featuredProjects.slice(0, 2).map((project, index) => (
                <Card
                  key={project._id}
                  className='group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-hero transition-all duration-300 animate-fade-in hover:-translate-y-1'
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className='relative overflow-hidden'>
                    <Image
                      width={800}
                      height={400}
                      src={project.image || '/placeholder-project.svg'}
                      alt={project.title}
                      className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                    />

                    <div className='absolute top-4 right-4 bg-primary/80 text-primary-foreground px-3 py-1 rounded-md text-sm font-medium'>
                      {project.category}
                    </div>
                    <div className='absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-md text-sm font-medium'>
                      Featured
                    </div>
                  </div>
                  <CardContent className='p-6'>
                    <CardHeader className='p-0 pb-3'>
                      <CardTitle className='text-xl group-hover:text-primary transition-colors duration-300'>
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <p className='text-muted-foreground mb-4 leading-relaxed'>
                      {project.description}
                    </p>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <span className='flex items-center gap-1'>
                          <Eye className='w-4 h-4' />
                          {project.views || 0}
                        </span>
                        <span>{project.status}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              All Projects
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Browse through our complete portfolio of successful projects
            </p>

            {/* Filter Buttons */}
            {filters.length > 1 && (
              <div className='flex flex-wrap justify-center gap-4 mb-8'>
                {filters.map(filter => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`${
                      activeFilter === filter.id
                        ? 'bg-gradient-primary border-0'
                        : ''
                    }`}
                  >
                    <Filter size={16} className='mr-2' />
                    {filter.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProjects.map((project, index) => (
              <Card
                key={project._id}
                className='group cursor-pointer overflow-hidden border-0 bg-background shadow-card hover:shadow-hero transition-all duration-300 animate-fade-in hover:-translate-y-1'
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProjectClick(project)}
              >
                <div className='relative overflow-hidden'>
                  <Image
                    width={800}
                    height={400}
                    src={project.image || '/placeholder-project.svg'}
                    alt={project.title}
                    className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                  />

                  <div className='absolute top-4 right-4 bg-primary/80 text-primary-foreground px-3 py-1 rounded-md text-xs font-medium'>
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className='absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-md text-xs font-medium'>
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className='p-6'>
                  <CardHeader className='p-0 pb-2'>
                    <CardTitle className='text-lg group-hover:text-primary transition-colors duration-300'>
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <p className='text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3'>
                    {project.description}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <Eye className='w-4 h-4' />
                        {project.views || 0}
                      </span>
                      <span className='capitalize'>{project.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground text-lg'>
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
