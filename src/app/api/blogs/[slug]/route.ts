import { checkAdminAuth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
  _id?: string;
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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const query = new URL(request.url).searchParams;
    const publicView = query.get('public') === 'true';
    const action = query.get('action');

    if (!slug) {
      return NextResponse.json(
        { error: 'Blog slug is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Handle view increment action
    if (action === 'increment-views') {
      await db
        .collection('blogs')
        .updateOne({ slug: slug }, { $inc: { views: 1 } });
      return NextResponse.json({ message: 'View count updated' });
    }

    // Find blog post by slug
    const blogPost = await db.collection('blogs').findOne({
      slug: slug,
      status: publicView ? 'published' : { $ne: 'archived' },
    });

    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blogPost);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await context.params;
    const body = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: 'Blog slug is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if blog exists
    const existingBlog = await db.collection('blogs').findOne({ slug });
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    let newSlug = slug;
    if (body.title && body.title !== existingBlog.title) {
      const generatedSlug = generateSlug(body.title);

      // Check if new slug already exists (excluding current blog)
      const slugExists = await db.collection('blogs').findOne({
        slug: generatedSlug,
        _id: { $ne: existingBlog._id },
      });

      if (slugExists) {
        // Append timestamp to make slug unique
        newSlug = `${generatedSlug}-${Date.now()}`;
      } else {
        newSlug = generatedSlug;
      }
    }

    // Prepare update data
    const updateData: Partial<BlogPost> = {
      ...body,
      slug: newSlug,
      updatedAt: new Date().toISOString(),
    };

    // Set published date if status changed to published
    if (body.status === 'published' && existingBlog.status !== 'published') {
      updateData.publishedDate = new Date().toISOString();
    }

    // Update blog post
    const result = await db
      .collection('blogs')
      .updateOne({ slug }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post updated successfully',
      slug: newSlug,
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Blog slug is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db.collection('blogs').deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
