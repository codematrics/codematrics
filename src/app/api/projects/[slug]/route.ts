import { getDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { slug } = await params;
    const db = await getDatabase();

    const project = await db.collection('projects').findOne({ slug });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Increment view count
    await db.collection('projects').updateOne({ slug }, { $inc: { views: 1 } });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { slug } = await params;
    const data = await request.json();
    const db = await getDatabase();

    // Remove fields that shouldn't be updated directly
    delete data._id;
    delete data.createdAt;
    delete data.views;

    // Update the updatedAt timestamp
    data.updatedAt = new Date();

    // If title is being updated, update slug too
    if (data.title) {
      const newSlug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if new slug conflicts with existing projects (except current one)
      if (newSlug !== slug) {
        const existingProject = await db
          .collection('projects')
          .findOne({ slug: newSlug });
        if (existingProject) {
          return NextResponse.json(
            { error: 'A project with this title already exists' },
            { status: 400 }
          );
        }
        data.slug = newSlug;
      }
    }

    const result = await db
      .collection('projects')
      .updateOne({ slug }, { $set: data });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Fetch updated project
    const updatedProject = await db
      .collection('projects')
      .findOne({ slug: data.slug || slug });

    return NextResponse.json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { slug } = await params;
    const db = await getDatabase();

    const result = await db.collection('projects').deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
