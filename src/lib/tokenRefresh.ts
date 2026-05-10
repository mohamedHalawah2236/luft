import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import { authOptions } from './auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Cache mechanism to prevent duplicate refresh attempts
let refreshPromise: Promise<any> | null = null;
let cachedToken: any | null = null;
let cacheExpiresAt: number = 0;
const CACHE_DURATION_MS = 5000; // 5 seconds

interface TokenData {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
}

/**
 * Refresh the access token using the refresh token
 * Includes caching to prevent duplicate refresh attempts when multiple API calls fire simultaneously
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<TokenData | null> {
  // Check if we have a valid cached token
  if (cachedToken !== null && Date.now() < cacheExpiresAt) {
    console.log('Returning cached refreshed token');
    return cachedToken;
  }

  // Check if refresh is already in progress
  if (refreshPromise) {
    console.log('Refresh already in progress, waiting...');
    return refreshPromise;
  }

  console.log('Starting token refresh...');

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      console.log('Token refresh successful');

      const refreshedToken: TokenData = {
        accessToken: data.result.accessToken,
        refreshToken: data.result.refreshToken,
        accessTokenExpiresAt: data.result.accessTokenExpiresAt,
        refreshTokenExpiresAt: data.result.refreshTokenExpiresAt,
      };

      // Cache the refreshed token
      cachedToken = refreshedToken;
      cacheExpiresAt = Date.now() + CACHE_DURATION_MS;

      return refreshedToken;
    } catch (error) {
      console.error('Token refresh failed:', error);

      // Clear cache on failure
      cachedToken = null;
      cacheExpiresAt = 0;

      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Get a valid access token, refreshing if necessary
 * Handles concurrent calls by caching refresh attempts
 */
export async function getValidAccessToken(): Promise<string | null> {
  const isServer = typeof window === 'undefined';

  // Get current session
  const session = isServer
    ? await getServerSession(authOptions)
    : await getSession({ broadcast: true });

  if (!session) {
    console.log('No session found');
    return null;
  }

  const { accessToken, refreshToken, accessTokenExpiresAt } = session as any;

  if (!accessToken || !refreshToken) {
    console.log('Missing tokens in session');
    return null;
  }

  // Check if access token is still valid
  if (accessTokenExpiresAt) {
    const expiresAt = new Date(accessTokenExpiresAt).getTime();
    const now = Date.now();

    // Token is still valid
    if (now < expiresAt) {
      return accessToken;
    }

    console.log('Access token expired, refreshing...');
  }

  // Token is expired, refresh it
  const refreshedTokens = await refreshAccessToken(refreshToken);

  if (!refreshedTokens) {
    console.error('Failed to refresh token, logging out...');
    // Refresh failed, log out the user
    if (!isServer) {
      await signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    }
    return null;
  }

  // Note: We don't update the NextAuth session here because:
  // 1. The refreshed token is cached in memory for 5 seconds
  // 2. Concurrent API calls within the cache window will reuse the cached token
  // 3. After cache expires, we'll refresh again (the backend should accept the same refresh token multiple times)
  //
  // If your backend invalidates refresh tokens after use, you'll need to implement
  // session updates here using NextAuth's update mechanism

  return refreshedTokens.accessToken;
}
