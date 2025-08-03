'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import BlogFilters from '@/components/BlogFilters';
import BlogList from '@/components/BlogList';
import Pagination from '@/components/Pagination';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
  slug: string;
  featuredImage?: string;
  category: string;
}

export default function BlogsPageClient() {
  const params = useSearchParams();
  const page = Number(params.get('page')) || 1;
  const search = params.get('search') || '';
  const category = params.get('category') || '';

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        status: 'published',
        page: page.toString(),
        limit: '9',
        ...(search && { search }),
        ...(category && { category }),
      });

      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`/api/blogs?${query}`),
          fetch(`/api/blogs?categories=true`),
        ]);

        if (postsRes.ok) {
          const data = await postsRes.json();
          setBlogPosts(data.blogs || []);
          setTotalPages(data.pagination?.totalPages || 1);
        }

        if (categoriesRes.ok) {
          const catData = await categoriesRes.json();
          setCategories(catData.categories || []);
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, category]);

  return (
    <>
      <BlogFilters
        categories={categories}
        initialSearch={search}
        initialCategory={category}
      />

      {loading ? (
        <p className='text-center text-muted-foreground'>Loading blogs...</p>
      ) : blogPosts.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-lg text-muted-foreground mb-6'>
            {search || category
              ? 'No articles found matching your criteria.'
              : 'No articles published yet.'}
          </p>
          <Link href='/'>
            <Button>Back to Home</Button>
          </Link>
        </div>
      ) : (
        <>
          <BlogList blogPosts={blogPosts} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              search={search}
              category={category}
            />
          )}
        </>
      )}
    </>
  );
}
