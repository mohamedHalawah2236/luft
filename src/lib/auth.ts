import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthUserApiResponse } from '@/types/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Singleton refresh promise to prevent race conditions
let refreshPromise: Promise<any> | null = null;

interface TokenData {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

/**
 * Refresh the access token using the refresh token
 * Uses singleton pattern to prevent concurrent refresh attempts
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<TokenData | null> {
  // If refresh is already in progress, wait for it
  if (refreshPromise) {
    console.log('Token refresh already in progress, waiting...');
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

      return {
        accessToken: data.result.accessToken,
        refreshToken: data.result.refreshToken,
        accessTokenExpiresAt: data.result.accessTokenExpiresAt,
        refreshTokenExpiresAt: data.result.refreshTokenExpiresAt,
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    } finally {
      // Clear the promise after completion
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials) {
        if (!credentials) return null;

        const {
          userId,
          fullName,
          email,
          accessToken,
          refreshToken,
          accessTokenExpiresAt,
          refreshTokenExpiresAt,
          profilePicture,
        } = credentials as AuthUserApiResponse;

        return {
          id: userId,
          email: email,
          name: fullName,
          image: profilePicture,
          accessToken,
          refreshToken,
          accessTokenExpiresAt,
          refreshTokenExpiresAt,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
        token.refreshTokenExpiresAt = user.refreshTokenExpiresAt;
        return token;
      }

      if (trigger === 'update') {
        // Handle token refresh updates from API layer
        if (session?.accessToken) {
          token.accessToken = session.accessToken;
        }
        if (session?.refreshToken) {
          token.refreshToken = session.refreshToken;
        }
        if (session?.accessTokenExpiresAt) {
          token.accessTokenExpiresAt = session.accessTokenExpiresAt;
        }
        if (session?.refreshTokenExpiresAt) {
          token.refreshTokenExpiresAt = session.refreshTokenExpiresAt;
        }
        // Handle user profile updates
        if (session?.user?.name) {
          token.name = session.user.name;
        }
        if (session?.user?.image !== undefined) {
          token.picture = session.user.image;
          token.image = session.user.image;
        }
        return token;
      }

      // Check if access token is expired
      if (token.accessTokenExpiresAt) {
        const expiresAt = new Date(
          token.accessTokenExpiresAt as string,
        ).getTime();
        const now = Date.now();

        // Token is still valid
        if (now < expiresAt) {
          return token;
        }

        console.log('Access token expired, refreshing...');

        // Token is expired, refresh it
        if (token.refreshToken) {
          const refreshedTokens = await refreshAccessToken(
            token.refreshToken as string,
          );

          if (refreshedTokens) {
            // Update token with refreshed values
            token.accessToken = refreshedTokens.accessToken;
            token.refreshToken = refreshedTokens.refreshToken;
            token.accessTokenExpiresAt = refreshedTokens.accessTokenExpiresAt;
            token.refreshTokenExpiresAt = refreshedTokens.refreshTokenExpiresAt;
            delete token.error;
          } else {
            // Refresh failed, mark token with error
            token.error = 'RefreshAccessTokenError';
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        if (token.picture !== undefined || token.image !== undefined) {
          session.user.image = (token.picture ?? token.image) as string;
        }
      }
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      session.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
      session.error = token.error;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
