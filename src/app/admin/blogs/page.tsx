'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit,
  Eye,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedDate?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    limit: 10,
  });
  const router = useRouter();
  const hasInitialLoaded = useRef(false);

  const fetchBlogs = useCallback(
    async (page: number, search: string) => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          ...(search && { search }),
        });

        const response = await fetch(`/api/blogs?${params.toString()}`);

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const result = await response.json();

        if (result.data && result.pagination) {
          setBlogs(result.data);
          setPagination(result.pagination);
          setCurrentPage(result.pagination.currentPage);
        } else {
          setBlogs(result);
          setPagination({
            currentPage: page,
            totalPages: 1,
            totalCount: result.length,
            hasNextPage: false,
            hasPreviousPage: false,
            limit: 10,
          });
        }
      } catch {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Debounce search term
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  // Initial load
  useEffect(() => {
    if (!hasInitialLoaded.current && debouncedSearchTerm === '') {
      hasInitialLoaded.current = true;
      fetchBlogs(1, '');
    }
  }, [fetchBlogs, debouncedSearchTerm]);

  // Fetch blogs when debounced search term changes
  useEffect(() => {
    if (!hasInitialLoaded.current) return;

    const newPage = 1;
    setCurrentPage(newPage);
    fetchBlogs(newPage, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchBlogs]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBlogs(page, debouncedSearchTerm);
  };

  // Handle search changes
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  // Refresh function for buttons
  const handleRefresh = useCallback(() => {
    fetchBlogs(currentPage, debouncedSearchTerm);
  }, [fetchBlogs, currentPage, debouncedSearchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const exportToCSV = () => {
    const headers = [
      'ID',
      'Title',
      'Author',
      'Status',
      'Category',
      'Views',
      'Published Date',
    ];
    const csvContent = [
      headers.join(','),
      ...blogs.map(blog =>
        [
          blog._id,
          `"${blog.title}"`,
          blog.author,
          blog.status,
          blog.category,
          blog.views,
          blog.publishedDate || blog.createdAt,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blogs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      });

      // Refresh the list
      handleRefresh();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete blog',
      });
    }
  };

  const openBlogModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
        <div className='container mx-auto max-w-7xl'>
          <div className='text-center py-12'>
            <p className='text-destructive mb-4'>{error}</p>
            <Button onClick={handleRefresh}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-7xl'>
        {/* Header */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div>
                <CardTitle className='text-2xl'>Blog Management</CardTitle>
                <p className='text-muted-foreground'>
                  Create and manage blog posts
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  onClick={handleRefresh}
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
                <Button
                  onClick={exportToCSV}
                  variant='outline'
                  className='flex items-center gap-2'
                >
                  <Download className='h-4 w-4' />
                  Export CSV
                </Button>
                <Button
                  onClick={() => router.push('/admin/blogs/new')}
                  className='flex items-center gap-2'
                >
                  <Plus className='h-4 w-4' />
                  New Blog
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Search by title, author, category, or content...'
                value={searchTerm}
                onChange={e => handleSearchChange(e.target.value)}
                className='pl-10 pr-10'
              />
              {isSearching && (
                <RefreshCw className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground' />
              )}
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left p-3 font-medium'>Title</th>
                    <th className='text-left p-3 font-medium'>Author</th>
                    <th className='text-left p-3 font-medium'>Category</th>
                    <th className='text-left p-3 font-medium'>Status</th>
                    <th className='text-left p-3 font-medium'>Published</th>
                    <th className='text-left p-3 font-medium'>Views</th>
                    <th className='text-left p-3 font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className='text-center p-8 text-muted-foreground'
                      >
                        <RefreshCw className='animate-spin h-6 w-6 mx-auto mb-2' />
                        Loading blogs...
                      </td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className='text-center p-8 text-muted-foreground'
                      >
                        No blogs found
                      </td>
                    </tr>
                  ) : (
                    blogs.map(blog => (
                      <tr
                        key={blog._id}
                        className='border-b hover:bg-accent/50'
                      >
                        <td className='p-3'>
                          <div className='space-y-1'>
                            <div className='font-medium'>{blog.title}</div>
                            <div className='text-sm text-muted-foreground line-clamp-2'>
                              {blog.excerpt}
                            </div>
                          </div>
                        </td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2 text-sm'>
                            <User className='h-3 w-3 text-primary' />
                            <span>{blog.author}</span>
                          </div>
                        </td>
                        <td className='p-3'>
                          <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs'>
                            {blog.category}
                          </span>
                        </td>
                        <td className='p-3'>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              blog.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : blog.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {blog.status}
                          </span>
                        </td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Calendar className='h-3 w-3' />
                            <span>
                              {blog.publishedDate
                                ? formatDate(blog.publishedDate)
                                : 'Not published'}
                            </span>
                          </div>
                        </td>
                        <td className='p-3'>
                          <span className='text-sm'>
                            {blog.views.toLocaleString()}
                          </span>
                        </td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => openBlogModal(blog)}
                              className='flex items-center gap-1'
                            >
                              <Eye className='h-3 w-3' />
                              View
                            </Button>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() =>
                                router.push(`/admin/blogs/${blog.slug}/edit`)
                              }
                              className='flex items-center gap-1'
                            >
                              <Edit className='h-3 w-3' />
                              Edit
                            </Button>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDeleteBlog(blog.slug)}
                              className='flex items-center gap-1'
                            >
                              <Trash2 className='h-3 w-3' />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && blogs.length > 0 && (
              <div className='flex items-center justify-between mt-6'>
                <div className='text-sm text-muted-foreground'>
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}{' '}
                  to{' '}
                  {Math.min(
                    pagination.currentPage * pagination.limit,
                    pagination.totalCount
                  )}{' '}
                  of {pagination.totalCount} blogs
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(1)}
                    disabled={!pagination.hasPreviousPage}
                  >
                    <ChevronsLeft className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPreviousPage}
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </Button>

                  <span className='text-sm font-medium'>
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                  >
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={!pagination.hasNextPage}
                  >
                    <ChevronsRight className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blog Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <User className='h-5 w-5 text-primary' />
                Blog Details
              </DialogTitle>
              <DialogDescription>
                Complete information about this blog post
              </DialogDescription>
            </DialogHeader>

            {selectedBlog && (
              <div className='space-y-6'>
                {/* Header Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Title
                    </label>
                    <h3 className='font-semibold text-lg'>
                      {selectedBlog.title}
                    </h3>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Author
                    </label>
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4 text-primary' />
                      <span>{selectedBlog.author}</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Category
                    </label>
                    <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs'>
                      {selectedBlog.category}
                    </span>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Status
                    </label>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        selectedBlog.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : selectedBlog.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {selectedBlog.status}
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Excerpt
                  </label>
                  <p className='text-sm leading-relaxed'>
                    {selectedBlog.excerpt}
                  </p>
                </div>

                {/* Content */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Content
                  </label>
                  <div
                    className='prose prose-sm max-w-none p-4 bg-accent/20 border rounded-lg'
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                  />
                </div>

                {/* Meta Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Views
                    </label>
                    <span className='font-medium'>
                      {selectedBlog.views.toLocaleString()}
                    </span>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Published Date
                    </label>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-primary' />
                      <span>
                        {selectedBlog.publishedDate
                          ? formatDate(selectedBlog.publishedDate)
                          : 'Not published'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex gap-3 pt-4 border-t'>
                  <Button
                    onClick={() => {
                      window.open(`/blog/${selectedBlog.slug}`, '_blank');
                    }}
                    className='flex items-center gap-2'
                    disabled={selectedBlog.status !== 'published'}
                  >
                    <Eye className='h-4 w-4' />
                    View Live
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => {
                      router.push(`/admin/blogs/${selectedBlog.slug}/edit`);
                      closeBlogModal();
                    }}
                    className='flex items-center gap-2'
                  >
                    <Edit className='h-4 w-4' />
                    Edit Blog
                  </Button>
                  <Button variant='outline' onClick={closeBlogModal}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
