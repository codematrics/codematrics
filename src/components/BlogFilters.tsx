'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface BlogFiltersProps {
  categories: string[];
  initialSearch?: string;
  initialCategory?: string;
}

const BlogFilters = ({
  categories,
  initialSearch = '',
  initialCategory = '',
}: BlogFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  const updateURL = useCallback(
    (newSearch: string, newCategory: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSearch) {
        params.set('search', newSearch);
      } else {
        params.delete('search');
      }

      if (newCategory) {
        params.set('category', newCategory);
      } else {
        params.delete('category');
      }

      // Reset page when filters change
      params.delete('page');

      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Debounce search updates
    const timeoutId = setTimeout(() => {
      updateURL(value, category);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateURL(search, value);
  };

  useEffect(() => {
    setSearch(initialSearch);
    setCategory(initialCategory);
  }, [initialSearch, initialCategory]);

  return (
    <div className='flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
        <input
          type='text'
          placeholder='Search articles...'
          value={search}
          className='w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          onChange={e => handleSearchChange(e.target.value)}
        />
      </div>
      <select
        value={category}
        className='px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        onChange={e => handleCategoryChange(e.target.value)}
      >
        <option value=''>All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BlogFilters;
