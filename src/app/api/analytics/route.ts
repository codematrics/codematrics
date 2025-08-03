import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('codematrics');

    // Get analytics data
    const analytics = await db
      .collection('analytics')
      .findOne({ type: 'site' });
    const inquiries = await db.collection('inquiries').countDocuments();

    // Get inquiries by month for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const inquiriesByMonth = await db
      .collection('inquiries')
      .aggregate([
        {
          $match: {
            timestamp: { $gte: sixMonthsAgo.toISOString() },
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: { $dateFromString: { dateString: '$timestamp' } },
              },
              month: {
                $month: { $dateFromString: { dateString: '$timestamp' } },
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 },
        },
      ])
      .toArray();

    // Get blog analytics if exists
    const blogAnalytics = await db
      .collection('analytics')
      .find({ type: 'blog' })
      .toArray();

    const stats = {
      websiteVisitors: analytics?.visitors || 0,
      totalInquiries: inquiries,
      totalProjects: 12, // Static for now
      totalBlogs: blogAnalytics.length,
      inquiriesByMonth,
      blogVisitors: blogAnalytics,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, page, blogId } = await request.json();

    await client.connect();
    const db = client.db('codematrics');

    if (type === 'website') {
      // Update website visitor count
      await db.collection('analytics').updateOne(
        { type: 'site' },
        {
          $inc: { visitors: 1 },
          $set: { lastVisit: new Date().toISOString() },
        },
        { upsert: true }
      );
    } else if (type === 'blog' && blogId) {
      // Update blog visitor count
      await db.collection('analytics').updateOne(
        { type: 'blog', blogId },
        {
          $inc: { visitors: 1 },
          $set: {
            lastVisit: new Date().toISOString(),
            title: page || 'Unknown Blog',
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update analytics' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
