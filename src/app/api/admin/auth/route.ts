import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not configured' },
        { status: 500 }
      );
    }

    // Verify credentials
    if (username === adminUsername && password === adminPassword) {
      // Create a simple token (in production, use JWT or similar)
      const token = Buffer.from(
        `${username}:${Date.now()}:${process.env.NEXTAUTH_SECRET}`
      ).toString('base64');

      // Set HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json(
        { message: 'Login successful', success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Logout - clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete('admin-token');

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
