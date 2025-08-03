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
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Eye,
  Mail,
  RefreshCw,
  Search,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: string;
  status?: 'new' | 'read' | 'replied';
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
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

  const fetchInquiries = useCallback(
    async (page: number, search: string) => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          ...(search && { search }),
        });

        const response = await fetch(`/api/contact?${params.toString()}`);

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch inquiries');
        }

        const result = await response.json();

        // Handle both old format (direct array) and new format (with pagination)
        if (result.data && result.pagination) {
          setInquiries(result.data);
          setPagination(result.pagination);
          setCurrentPage(result.pagination.currentPage);
        } else {
          // Fallback for old format
          setInquiries(result);
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
        setError('Failed to load inquiries');
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
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  // Initial load
  useEffect(() => {
    if (!hasInitialLoaded.current && debouncedSearchTerm === '') {
      hasInitialLoaded.current = true;
      fetchInquiries(1, '');
    }
  }, [fetchInquiries, debouncedSearchTerm]);

  // Fetch inquiries when debounced search term changes
  useEffect(() => {
    // Skip initial load (handled above)
    if (!hasInitialLoaded.current) return;

    // Reset to first page when search changes
    const newPage = 1;
    setCurrentPage(newPage);
    fetchInquiries(newPage, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchInquiries]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchInquiries(page, debouncedSearchTerm);
  };

  // Handle search changes (just update the input value, debouncing will handle the API call)
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  // Refresh function for buttons
  const handleRefresh = useCallback(() => {
    fetchInquiries(currentPage, debouncedSearchTerm);
  }, [fetchInquiries, currentPage, debouncedSearchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportToCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Company',
      'Subject',
      'Message',
      'Status',
      'Timestamp',
    ];
    const csvContent = [
      headers.join(','),
      ...inquiries.map(inquiry =>
        [
          inquiry._id,
          `"${inquiry.name}"`,
          inquiry.email,
          inquiry.company || '',
          `"${inquiry.subject}"`,
          `"${inquiry.message.replace(/"/g, '""')}"`,
          inquiry.status || 'new',
          inquiry.timestamp,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const openInquiryModal = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const closeInquiryModal = () => {
    setSelectedInquiry(null);
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
        <div className='container mx-auto max-w-7xl'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <p className='text-red-500 mb-4'>{error}</p>
              <Button onClick={handleRefresh}>Try Again</Button>
            </div>
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
                <CardTitle className='text-2xl'>Contact Inquiries</CardTitle>
                <p className='text-muted-foreground'>
                  Manage and review customer inquiries
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Search by name, email, subject, or message...'
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
                    <th className='text-left p-3 font-medium'>Name</th>
                    <th className='text-left p-3 font-medium'>Email</th>
                    <th className='text-left p-3 font-medium'>Subject</th>
                    <th className='text-left p-3 font-medium'>Message</th>
                    <th className='text-left p-3 font-medium'>Date</th>
                    <th className='text-left p-3 font-medium'>Status</th>
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
                        Loading inquiries...
                      </td>
                    </tr>
                  ) : inquiries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className='text-center p-8 text-muted-foreground'
                      >
                        No inquiries found
                      </td>
                    </tr>
                  ) : (
                    inquiries.map(inquiry => (
                      <tr
                        key={inquiry._id}
                        className='border-b hover:bg-accent/50'
                      >
                        <td className='p-3'>
                          <div className='space-y-1'>
                            <div className='flex items-center gap-2'>
                              <User className='h-4 w-4 text-primary' />
                              <span className='font-medium'>
                                {inquiry.name}
                              </span>
                            </div>
                            {inquiry.company && (
                              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Briefcase className='h-3 w-3' />
                                <span>{inquiry.company}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2 text-sm'>
                            <Mail className='h-3 w-3 text-primary' />
                            <a
                              href={`mailto:${inquiry.email}`}
                              className='text-primary hover:underline'
                            >
                              {inquiry.email}
                            </a>
                          </div>
                        </td>
                        <td className='p-3'>
                          <div className='max-w-xs'>
                            <span className='font-medium text-sm text-primary line-clamp-2'>
                              {inquiry.subject}
                            </span>
                          </div>
                        </td>
                        <td className='p-3'>
                          <div className='max-w-xs'>
                            <span className='text-sm text-muted-foreground line-clamp-2'>
                              {inquiry.message}
                            </span>
                          </div>
                        </td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Calendar className='h-3 w-3' />
                            <span>{formatDate(inquiry.timestamp)}</span>
                          </div>
                        </td>
                        <td className='p-3'>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              inquiry.status === 'replied'
                                ? 'bg-green-100 text-green-700'
                                : inquiry.status === 'read'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {inquiry.status || 'new'}
                          </span>
                        </td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => openInquiryModal(inquiry)}
                              className='flex items-center gap-1'
                            >
                              <Eye className='h-3 w-3' />
                              View
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
            {!loading && inquiries.length > 0 && (
              <div className='flex items-center justify-between mt-6'>
                <div className='text-sm text-muted-foreground'>
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}{' '}
                  to{' '}
                  {Math.min(
                    pagination.currentPage * pagination.limit,
                    pagination.totalCount
                  )}{' '}
                  of {pagination.totalCount} inquiries
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

        {/* Inquiry Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <User className='h-5 w-5 text-primary' />
                Inquiry Details
              </DialogTitle>
              <DialogDescription>
                Complete information about this customer inquiry
              </DialogDescription>
            </DialogHeader>

            {selectedInquiry && (
              <div className='space-y-6'>
                {/* Contact Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Name
                    </label>
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4 text-primary' />
                      <span className='font-medium'>
                        {selectedInquiry.name}
                      </span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Email
                    </label>
                    <div className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-primary' />
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className='text-primary hover:underline'
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>

                  {selectedInquiry.company && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Company
                      </label>
                      <div className='flex items-center gap-2'>
                        <Briefcase className='h-4 w-4 text-primary' />
                        <span>{selectedInquiry.company}</span>
                      </div>
                    </div>
                  )}

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Date
                    </label>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-primary' />
                      <span>{formatDate(selectedInquiry.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Subject
                  </label>
                  <div className='p-3 bg-primary/5 border border-primary/20 rounded-lg'>
                    <span className='font-medium text-primary'>
                      {selectedInquiry.subject}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Message
                  </label>
                  <div className='p-4 bg-accent/50 border rounded-lg'>
                    <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Status
                  </label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      selectedInquiry.status === 'replied'
                        ? 'bg-green-100 text-green-700'
                        : selectedInquiry.status === 'read'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {selectedInquiry.status || 'new'}
                  </span>
                </div>

                {/* Actions */}
                <div className='flex gap-3 pt-4 border-t'>
                  <Button
                    onClick={() =>
                      window.open(
                        `mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}&body=Hello ${selectedInquiry.name},%0D%0A%0D%0AThank you for your inquiry about ${selectedInquiry.subject}.%0D%0A%0D%0A`
                      )
                    }
                    className='flex items-center gap-2'
                  >
                    <Mail className='h-4 w-4' />
                    Reply via Email
                  </Button>
                  <Button
                    variant='outline'
                    onClick={closeInquiryModal}
                    className='flex items-center gap-2'
                  >
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
