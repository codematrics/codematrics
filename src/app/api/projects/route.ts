import { getDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status') || 'published';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');

    // Handle categories request
    if (searchParams.has('categories')) {
      const db = await getDatabase();
      const categories = await db
        .collection('projects')
        .distinct('category', { status: 'published' });
      return NextResponse.json({ categories });
    }

    const db = await getDatabase();

    // Build query
    const query: {
      status: string;
      category?: string;
      featured?: boolean;
      [key: string]: unknown;
    } = {
      status,
    };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get projects with pagination
    const projects = await db
      .collection('projects')
      .find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const totalProjects = await db.collection('projects').countDocuments(query);
    const totalPages = Math.ceil(totalProjects / limit);

    return NextResponse.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'technologies'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const db = await getDatabase();

    // Create slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingProject = await db.collection('projects').findOne({ slug });
    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this title already exists' },
        { status: 400 }
      );
    }

    const newProject = {
      ...data,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: data.status || 'published',
      featured: data.featured || false,
    };

    const result = await db.collection('projects').insertOne(newProject);

    return NextResponse.json({
      message: 'Project created successfully',
      project: { ...newProject, _id: result.insertedId },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
