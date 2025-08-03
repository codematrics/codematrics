import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    author: string;
    createdAt: string;
    slug: string;
    featuredImage?: string;
    category: string;
  };
  delay?: number;
}

export default function BlogCard({ post, delay = 0 }: Props) {
  return (
    <Card
      className='group hover:shadow-lg transition-all duration-300 shadow-card bg-background overflow-hidden'
      style={{ animationDelay: `${delay}s` }}
    >
      {post.featuredImage && (
        <div className='aspect-video overflow-hidden'>
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={400}
            height={225}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>
      )}
      <CardContent className='p-4 sm:p-6'>
        <div className='flex items-center gap-4 text-xs text-muted-foreground mb-3'>
          <div className='flex items-center gap-1'>
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Calendar size={14} />
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <h2 className='text-lg font-semibold text-foreground mb-3 group-hover:text-primary line-clamp-2'>
          {post.title}
        </h2>
        <p className='text-sm text-muted-foreground mb-4 line-clamp-3'>
          {post.excerpt}
        </p>

        <div className='flex items-center justify-between'>
          <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'>
            {post.category}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className='inline-flex items-center text-sm text-primary hover:text-primary/80 group-hover:translate-x-1 duration-300'
          >
            Read More
            <ArrowRight size={14} className='ml-1' />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
