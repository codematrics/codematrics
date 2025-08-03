'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Eye,
  MessageSquare,
  RefreshCw,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface AnalyticsData {
  websiteVisitors: number;
  totalInquiries: number;
  totalProjects: number;
  totalBlogs: number;
  inquiriesByMonth: Array<{
    _id: { year: number; month: number };
    count: number;
  }>;
  blogVisitors: Array<{
    blogId: string;
    title: string;
    visitors: number;
  }>;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics');

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data);
    } catch {
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Format month data for charts
  const formatInquiriesData = (data: AnalyticsData['inquiriesByMonth']) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return data.map(item => ({
      month: months[item._id.month - 1],
      inquiries: item.count,
    }));
  };

  // Generate sample visitor data for demonstration
  const generateVisitorData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      visitors: Math.floor(Math.random() * 1000) + 500,
    }));
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
        <div className='container mx-auto max-w-7xl'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
        <div className='container mx-auto max-w-7xl'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <p className='text-red-500 mb-4'>
                {error || 'No data available'}
              </p>
              <Button onClick={fetchAnalytics}>Try Again</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const visitorData = generateVisitorData();
  const inquiriesData = formatInquiriesData(analytics.inquiriesByMonth);

  return (
    <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              Dashboard
            </h1>
            <p className='text-muted-foreground'>
              Overview of your website analytics and performance
            </p>
          </div>
          <Button
            onClick={fetchAnalytics}
            variant='outline'
            className='flex items-center gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            Refresh Data
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Website Visitors
                  </p>
                  <p className='text-2xl font-bold'>
                    {analytics.websiteVisitors.toLocaleString()}
                  </p>
                </div>
                <Users className='h-8 w-8 text-blue-500' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Total Inquiries
                  </p>
                  <p className='text-2xl font-bold'>
                    {analytics.totalInquiries}
                  </p>
                </div>
                <MessageSquare className='h-8 w-8 text-green-500' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Total Projects
                  </p>
                  <p className='text-2xl font-bold'>
                    {analytics.totalProjects}
                  </p>
                </div>
                <Briefcase className='h-8 w-8 text-purple-500' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>Total Blogs</p>
                  <p className='text-2xl font-bold'>{analytics.totalBlogs}</p>
                </div>
                <BookOpen className='h-8 w-8 text-orange-500' />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* Website Visitors Chart */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='h-5 w-5' />
                Website Visitors (Last 6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={visitorData}>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='visitors'
                    stroke='#3b82f6'
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inquiries Chart */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BarChart3 className='h-5 w-5' />
                Monthly Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={inquiriesData}>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='inquiries' fill='#10b981' />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Blog Analytics */}
        {analytics.blogVisitors.length > 0 && (
          <Card className='mb-8'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Eye className='h-5 w-5' />
                Blog Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {analytics.blogVisitors.map(blog => (
                  <div
                    key={blog.blogId}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div>
                      <h4 className='font-medium'>{blog.title}</h4>
                      <p className='text-sm text-muted-foreground'>
                        Blog ID: {blog.blogId}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-2xl font-bold'>{blog.visitors}</p>
                      <p className='text-sm text-muted-foreground'>visitors</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Last Updated */}
        <div className='text-center text-sm text-muted-foreground'>
          Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
