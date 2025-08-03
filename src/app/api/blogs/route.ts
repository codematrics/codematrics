import { checkAdminAuth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
  _id?: ObjectId;
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

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    const { title, content, excerpt, author, category } = body;
    if (!title || !content || !excerpt || !author || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(title);

    // Create new blog post
    const newBlog: Omit<BlogPost, '_id'> = {
      title,
      slug,
      content,
      excerpt,
      author,
      status: body.status || 'draft',
      category,
      tags: body.tags || [],
      featuredImage: body.featuredImage || '',
      publishedDate:
        body.status === 'published' ? new Date().toISOString() : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      metaTitle: body.metaTitle || title,
      metaDescription: body.metaDescription || excerpt,
      metaKeywords: body.metaKeywords || [],
    };

    // Check if slug already exists
    const db = await getDatabase();
    const existingBlog = await db.collection('blogs').findOne({ slug });
    if (existingBlog) {
      // Append timestamp to make slug unique
      newBlog.slug = `${slug}-${Date.now()}`;
    }

    // Save to MongoDB
    const result = await db.collection('blogs').insertOne(newBlog);

    return NextResponse.json(
      { message: 'Blog post created successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Handle categories request
    if (searchParams.get('categories') === 'true') {
      const db = await getDatabase();
      const categories = await db
        .collection('blogs')
        .distinct('category', { status: 'published' });

      return NextResponse.json({ categories });
    }

    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get('limit') || '10'))
    );
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const exclude = searchParams.get('exclude') || '';
    const isPublic = searchParams.get('public') === 'true';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery: Record<string, unknown> = {};

    // For public requests, only show published blogs
    if (isPublic || status === 'published') {
      searchQuery.status = 'published';
    } else {
      // Check admin authentication for non-public requests
      const isAuthenticated = await checkAdminAuth();
      if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Add search filters
    if (search) {
      searchQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (status && !isPublic) {
      searchQuery.status = status;
    }

    if (category) {
      searchQuery.category = category;
    }

    if (exclude) {
      searchQuery._id = { $ne: new ObjectId(exclude) };
    }

    // Get blogs from MongoDB
    const db = await getDatabase();

    // Get total count for pagination
    const totalCount = await db.collection('blogs').countDocuments(searchQuery);

    // Get paginated blogs
    const blogs = await db
      .collection('blogs')
      .find(searchQuery)
      .sort({ publishedDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      blogs,
      data: blogs, // Keep both for compatibility
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPreviousPage,
        limit,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
