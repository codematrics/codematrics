'use client';

import BlogForm from '@/components/BlogForm';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogData {
  _id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`);

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }

        const blog = await response.json();
        setBlogData(blog);
      } catch {
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>Error</h1>
          <p className='text-gray-600'>{error || 'Blog not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <BlogForm
      initialData={{
        slug: blogData.slug,
        title: blogData.title,
        content: blogData.content,
        excerpt: blogData.excerpt,
        author: blogData.author,
        status: blogData.status,
        category: blogData.category,
        tags: blogData.tags,
        featuredImage: blogData.featuredImage,
        metaTitle: blogData.metaTitle,
        metaDescription: blogData.metaDescription,
        metaKeywords: blogData.metaKeywords,
      }}
      isEditing={true}
    />
  );
}
