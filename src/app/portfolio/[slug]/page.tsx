'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar,Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `/api/projects/${(await params).slug}?public=true`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError('Project not found');
          } else {
            setError('Failed to load project');
          }
          return;
        }

        const projectData = await response.json();
        setProject(projectData);
      } catch {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Project Not Found</h1>
          <p className='text-muted-foreground mb-6'>
            The project you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href='/portfolio'>
            <Button>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-background'>
      {/* Back Navigation */}
      <div className='pt-20 pb-8'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Link href='/portfolio'>
            <Button variant='ghost' className='mb-6'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Project Header */}
      <section className='pb-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            {/* Project Image */}
            <div className='relative aspect-video rounded-lg overflow-hidden bg-muted'>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-muted-foreground'>No image available</p>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                  {project.category}
                </span>
                {project.featured && (
                  <span className='px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium'>
                    Featured
                  </span>
                )}
              </div>

              <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins'>
                {project.title}
              </h1>

              <p className='text-lg text-muted-foreground mb-6'>
                {project.description}
              </p>

              {/* Project Meta */}
              <div className='flex items-center gap-6 text-sm text-muted-foreground mb-8'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className='flex items-center gap-2'>
                  <Eye className='w-4 h-4' />
                  {project.views} views
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className='pb-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Card>
            <CardContent className='p-8'>
              <div
                className='prose prose-lg max-w-none
                  prose-headings:font-poppins prose-headings:text-foreground
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8 prose-h1:first:mt-0
                  prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-6
                  prose-h3:text-xl prose-h3:font-medium prose-h3:mb-3 prose-h3:mt-5
                  prose-h4:text-lg prose-h4:font-medium prose-h4:mb-2 prose-h4:mt-4
                  prose-h5:text-base prose-h5:font-medium prose-h5:mb-2 prose-h5:mt-3
                  prose-h6:text-sm prose-h6:font-medium prose-h6:mb-2 prose-h6:mt-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                  prose-ul:text-muted-foreground prose-ul:mb-4
                  prose-ol:text-muted-foreground prose-ol:mb-4
                  prose-li:mb-1
                  prose-hr:border-border prose-hr:my-8
                  prose-table:border-collapse prose-table:border prose-table:border-border
                  prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-th:font-semibold
                  prose-td:border prose-td:border-border prose-td:p-2
                  prose-img:rounded-lg prose-img:shadow-md'
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
