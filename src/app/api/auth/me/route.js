import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserById } from '@/models/User';

export async function GET() {
  try {
    // Get user ID from session cookie
    const userId = cookies().get('medilearn-session')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      // Get user from database
      const user = await findUserById(userId);
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      
      return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
      // User ID verification failed
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
} 