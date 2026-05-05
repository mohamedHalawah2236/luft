import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthUserApiResponse } from '@/types/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function refreshAccessToken(token: any) {
  console.log('refresh-token starts');
  try {
    const response = await fetch(`${apiUrl}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();

    return {
      ...token,
      accessToken: data.result.accessToken,
      refreshToken: data.result.refreshToken,
      accessTokenExpiresAt: data.result.accessTokenExpiresAt,
      refreshTokenExpiresAt: data.result.refreshTokenExpiresAt,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
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
      }

      if (trigger === 'update') {
        // Handle token refresh updates
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
        // Return early — don't fall through to expiry check after a manual update
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpiresAt) {
        const expiresAt = new Date(token.accessTokenExpiresAt).getTime();
        if (Date.now() < expiresAt) {
          return token;
        }
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
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

      // Pass error to client
      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
