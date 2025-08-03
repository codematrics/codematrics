import { checkAdminAuth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  _id?: ObjectId;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: string;
  status?: 'new' | 'read' | 'replied';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new inquiry
    const newInquiry: Omit<ContactFormData, '_id'> = {
      name,
      email,
      company: body.company || '',
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    // Save to MongoDB
    const db = await getDatabase();
    const result = await db.collection('inquiries').insertOne(newInquiry);

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', id: result.insertedId },
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
    // Check admin authentication using cookie
    const isAuthenticated = await checkAdminAuth();

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get('limit') || '10'))
    );
    const search = searchParams.get('search') || '';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { subject: { $regex: search, $options: 'i' } },
            { message: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // Get inquiries from MongoDB
    const db = await getDatabase();

    // Get total count for pagination
    const totalCount = await db
      .collection('inquiries')
      .countDocuments(searchQuery);

    // Get paginated inquiries
    const inquiries = await db
      .collection('inquiries')
      .find(searchQuery)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      data: inquiries,
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
