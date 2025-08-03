import BlogCard from '@/components/BlogCard';

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

export default function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
      {blogPosts.map((post, index) => (
        <BlogCard key={post._id} post={post} delay={index * 0.1} />
      ))}
    </div>
  );
}
