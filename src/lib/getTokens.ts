import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions } from './auth';

/**
 * Get access and refresh tokens from session
 * Works on both client and server side
 * Triggers JWT callback to refresh tokens if expired
 */
export async function getTokens() {
  // Check if we're on the server or client
  const isServer = typeof window === 'undefined';

  if (isServer) {
    // Server-side: use getServerSession
    const session = await getServerSession(authOptions);
    return {
      accessToken: session?.accessToken,
      refreshToken: session?.refreshToken,
    };
  } else {
    // Client-side: use getSession
    const session = await getSession();
    return {
      accessToken: session?.accessToken,
      refreshToken: session?.refreshToken,
    };
  }
}
