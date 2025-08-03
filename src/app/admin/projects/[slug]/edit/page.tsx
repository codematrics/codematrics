'use client';

import ProjectForm from '@/components/ProjectForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: string;
  updatedAt: string;
}

const EditProjectPage = () => {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          setProject(data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProject();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className='text-center py-16'>
        <h1 className='text-2xl font-bold text-foreground mb-4'>
          Project Not Found
        </h1>
        <p className='text-muted-foreground'>
          The project you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <ProjectForm
      initialData={{
        id: project.slug,
        title: project.title,
        description: project.description,
        category: project.category,
        technologies: project.technologies,
        image: project.image || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured,
        status: project.status,
      }}
      isEditing={true}
    />
  );
};

export default EditProjectPage;
