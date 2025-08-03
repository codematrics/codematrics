'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
  searchable?: boolean;
}

export interface TableAction<T> {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: (item: T) => void;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  loading?: boolean;
  onRefresh?: () => void;
  actions?: React.ReactNode | TableAction<T>[];
  // External search and pagination support
  onSearch?: (searchTerm: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export default function AdminTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  description,
  searchPlaceholder = 'Search...',
  itemsPerPage = 10,
  loading = false,
  onRefresh,
  actions,
  onSearch,
  pagination,
}: AdminTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Use external pagination if provided, otherwise use internal
  const isExternalPagination = !!pagination;
  const actualCurrentPage = isExternalPagination
    ? pagination.currentPage
    : currentPage;

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    } else {
      setCurrentPage(1);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (isExternalPagination && pagination?.onPageChange) {
      pagination.onPageChange(page);
    } else {
      setCurrentPage(page);
    }
  };

  // Get searchable columns
  const searchableColumns = columns.filter(col => col.searchable);

  // Filter data based on search term (only for internal search)
  const filteredData = useMemo(() => {
    if (onSearch || !searchTerm) return data;

    return data.filter(item => {
      return searchableColumns.some(column => {
        const value = item[column.key as keyof T];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchableColumns, onSearch]);

  // Sort data (only for internal pagination)
  const sortedData = useMemo(() => {
    if (isExternalPagination || !sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortOrder === 'asc' ? -1 : 1;
      if (bValue == null) return sortOrder === 'asc' ? 1 : -1;

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortBy, sortOrder, isExternalPagination]);

  // Pagination (only for internal pagination)
  const totalPages = isExternalPagination
    ? pagination.totalPages
    : Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = isExternalPagination
    ? 0
    : (actualCurrentPage - 1) * itemsPerPage;
  const paginatedData = isExternalPagination
    ? data
    : sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('asc');
    }
  };

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    handlePageChange(newPage);
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>{title}</h1>
          {description && (
            <p className='text-muted-foreground'>{description}</p>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {Array.isArray(actions) ? (
            // Render TableAction array - this will be handled in table rows
            <></>
          ) : (
            // Render ReactNode actions
            actions
          )}
          {onRefresh && (
            <Button onClick={onRefresh} variant='outline'>
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className='flex items-center gap-4'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={e => {
              handleSearch(e.target.value);
            }}
            className='pl-10'
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>
              {title && `${title} `}(
              {isExternalPagination ? 'Loading...' : filteredData.length} total)
            </span>
            <span className='text-sm font-normal text-muted-foreground'>
              Page {actualCurrentPage} of {totalPages}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          {paginatedData.length === 0 ? (
            <div className='p-8 text-center'>
              <p className='text-muted-foreground'>
                {searchTerm
                  ? 'No results match your search.'
                  : 'No data available.'}
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-muted/50'>
                    {columns.map(column => (
                      <th
                        key={String(column.key)}
                        className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'
                      >
                        {column.sortable ? (
                          <button
                            onClick={() => handleSort(String(column.key))}
                            className='flex items-center gap-1 hover:text-foreground transition-colors'
                          >
                            {column.label}
                            {sortBy === column.key && (
                              <span className='text-xs'>
                                {sortOrder === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </button>
                        ) : (
                          column.label
                        )}
                      </th>
                    ))}
                    {Array.isArray(actions) && (
                      <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className='border-b hover:bg-muted/50 transition-colors'
                    >
                      {columns.map(column => (
                        <td
                          key={String(column.key)}
                          className='px-4 py-3 text-sm'
                        >
                          {column.render
                            ? column.render(item[column.key as keyof T], item)
                            : String(item[column.key as keyof T] || '')}
                        </td>
                      ))}
                      {Array.isArray(actions) && (
                        <td className='px-4 py-3 text-sm'>
                          <div className='flex items-center gap-2'>
                            {actions.map((action, actionIndex) => {
                              const Icon = action.icon;
                              return (
                                <Button
                                  key={actionIndex}
                                  size='sm'
                                  variant={action.variant || 'outline'}
                                  onClick={() => action.onClick(item)}
                                >
                                  <Icon size={14} />
                                  {action.label}
                                </Button>
                              );
                            })}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            {isExternalPagination
              ? `Page ${actualCurrentPage} of ${totalPages}`
              : `Showing ${startIndex + 1} to ${Math.min(startIndex + itemsPerPage, sortedData.length)} of ${sortedData.length} results`}
          </p>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => goToPage(1)}
              disabled={actualCurrentPage === 1}
            >
              <ChevronsLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => goToPage(actualCurrentPage - 1)}
              disabled={actualCurrentPage === 1}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>

            {/* Page numbers */}
            <div className='flex items-center gap-1'>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, actualCurrentPage - 2)) +
                  i;
                if (pageNum > totalPages) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={
                      actualCurrentPage === pageNum ? 'default' : 'outline'
                    }
                    size='sm'
                    onClick={() => goToPage(pageNum)}
                    className='w-8 h-8 p-0'
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => goToPage(actualCurrentPage + 1)}
              disabled={actualCurrentPage === totalPages}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => goToPage(totalPages)}
              disabled={actualCurrentPage === totalPages}
            >
              <ChevronsRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
