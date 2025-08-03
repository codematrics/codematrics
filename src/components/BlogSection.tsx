import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

interface BlogSectionProps {
  posts: BlogPost[];
}

const BlogSection = ({ posts }: BlogSectionProps) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 sm:mb-12 md:mb-16'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-poppins'>
            Latest Insights
          </h2>
          <p className='text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto'>
            Stay updated with the latest trends in web development, design, and
            technology through our expert insights and tutorials.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto'>
          {posts.slice(0, 3).map((post, index) => (
            <Card
              key={post._id}
              className='group hover:shadow-lg transition-all duration-300 border-0 shadow-card bg-background animate-fade-in overflow-hidden'
              style={{ animationDelay: `${index * 0.2}s` }}
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
                <div className='flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-3'>
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

                <h3 className='text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                  {post.title}
                </h3>

                <p className='text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3'>
                  {post.excerpt}
                </p>

                <div className='flex items-center justify-between'>
                  <span className='text-xs sm:text-sm bg-primary/10 text-primary px-2 py-1 rounded-full'>
                    {post.category}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className='inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 duration-300'
                  >
                    Read More
                    <ArrowRight size={14} className='ml-1' />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length > 3 && (
          <div className='text-center mt-8 sm:mt-12'>
            <Link href='/blog'>
              <button className='inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'>
                View All Articles
                <ArrowRight size={18} className='ml-2' />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
