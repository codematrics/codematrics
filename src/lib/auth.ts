import { cookies } from 'next/headers';

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token');

    if (!token) {
      return false;
    }

    // Simple token validation (in production, use proper JWT verification)
    const decoded = Buffer.from(token.value, 'base64').toString();
    const [username, timestamp, secret] = decoded.split(':');

    // Check if token is valid
    if (
      username === process.env.ADMIN_USERNAME &&
      secret === process.env.NEXTAUTH_SECRET
    ) {
      // Check if token is not expired (24 hours)
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      return tokenAge < maxAge;
    }

    return false;
  } catch {
    return false;
  }
}
