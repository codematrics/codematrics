'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  Eye,
  Github,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project extends Record<string, unknown> {
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

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProjects = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
      });

      const response = await fetch(`/api/projects?${searchParams}`);
      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch projects',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleView = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${project.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        });
        fetchProjects(currentPage, searchTerm);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete project',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
      });
    }
  };

  return (
    <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-7xl'>
        {/* Header */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div>
                <CardTitle className='text-2xl'>Project Management</CardTitle>
                <p className='text-muted-foreground'>
                  Manage your portfolio projects
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  onClick={() => fetchProjects(currentPage, searchTerm)}
                  variant='outline'
                  size='sm'
                  disabled={loading}
                  className='flex items-center gap-2'
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                  />
                  Refresh
                </Button>
                <Link href='/admin/projects/new'>
                  <Button className='flex items-center gap-2'>
                    <Plus size={16} />
                    New Project
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <CardTitle>Projects ({projects.length} total)</CardTitle>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    placeholder='Search projects...'
                    value={searchTerm}
                    onChange={e => handleSearch(e.target.value)}
                    className='pl-10 w-64'
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='flex items-center justify-center h-64'>
                <div className='text-center'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
                  <p className='text-muted-foreground'>Loading projects...</p>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-muted-foreground text-lg'>
                  {searchTerm
                    ? 'No projects found matching your search.'
                    : 'No projects found.'}
                </p>
              </div>
            ) : (
              <>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b bg-muted/50'>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Image
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Title
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Technologies
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Status
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Featured
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Views
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Created
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(project => (
                        <tr
                          key={project._id}
                          className='border-b hover:bg-muted/50 transition-colors'
                        >
                          <td className='px-4 py-3 text-sm'>
                            <div className='w-12 h-12 relative rounded-lg overflow-hidden'>
                              {project.image ? (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className='object-cover'
                                />
                              ) : (
                                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                                  <span className='text-gray-400 text-xs'>
                                    No image
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            <div>
                              <p className='font-medium text-foreground'>
                                {project.title}
                              </p>
                              <p className='text-sm text-muted-foreground'>
                                {project.category}
                              </p>
                            </div>
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            <div className='flex flex-wrap gap-1'>
                              {project.technologies
                                .slice(0, 3)
                                .map((tech, index) => (
                                  <span
                                    key={index}
                                    className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {project.technologies.length > 3 && (
                                <span className='text-xs text-muted-foreground'>
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                project.status === 'published'
                                  ? 'bg-green-100 text-green-800'
                                  : project.status === 'draft'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                project.featured
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {project.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            {project.views || 0}
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            {new Date(project.createdAt).toLocaleDateString()}
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            <div className='flex items-center gap-2'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleView(project)}
                              >
                                <Eye size={14} />
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => {
                                  window.open(
                                    `/admin/projects/${project.slug}/edit`,
                                    '_blank'
                                  );
                                }}
                              >
                                <ExternalLink size={14} />
                              </Button>
                              <Button
                                size='sm'
                                variant='destructive'
                                onClick={() => handleDelete(project)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex items-center justify-between mt-6 pt-6 border-t'>
                    <p className='text-sm text-muted-foreground'>
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronsLeft className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronsRight className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className='space-y-6'>
              {selectedProject.image && (
                <div className='aspect-video relative rounded-lg overflow-hidden'>
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className='object-cover'
                  />
                </div>
              )}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Title
                    </h3>
                    <p className='text-muted-foreground'>
                      {selectedProject.title}
                    </p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Category
                    </h3>
                    <p className='text-muted-foreground'>
                      {selectedProject.category}
                    </p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Status
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        selectedProject.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : selectedProject.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedProject.status}
                    </span>
                  </div>

                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Views
                    </h3>
                    <p className='text-muted-foreground'>
                      {selectedProject.views || 0}
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Technologies
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Links
                    </h3>
                    <div className='space-y-2'>
                      {selectedProject.liveUrl &&
                        selectedProject.liveUrl !== '#' && (
                          <a
                            href={selectedProject.liveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 text-primary hover:underline'
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        )}
                      {selectedProject.githubUrl &&
                        selectedProject.githubUrl !== '#' && (
                          <a
                            href={selectedProject.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 text-primary hover:underline'
                          >
                            <Github size={14} />
                            Source Code
                          </a>
                        )}
                    </div>
                  </div>

                  <div>
                    <h3 className='font-semibold text-foreground mb-2'>
                      Created
                    </h3>
                    <p className='text-muted-foreground'>
                      {new Date(selectedProject.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='font-semibold text-foreground mb-2'>
                  Description
                </h3>
                <p className='text-muted-foreground'>
                  {selectedProject.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
