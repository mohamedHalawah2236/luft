import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthUserApiResponse } from '@/types/auth';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/refreshToken`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      },
    );

    if (!response.ok) throw new Error('Failed to refresh access token');

    const refreshed: AuthUserApiResponse = await response.json();

    return {
      ...token,
      accessToken: refreshed.accessToken,
      accessTokenExpires: new Date(refreshed.accessTokenExpiresAt).getTime(),
      // Only update refreshToken if the server returns a new one
      ...(refreshed.refreshToken && { refreshToken: refreshed.refreshToken }),
      error: undefined,
    };
  } catch {
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

        const { userId, fullName, email, accessToken, refreshToken } =
          credentials as AuthUserApiResponse;

        return {
          id: userId,
          email: email,
          name: fullName,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial login — store tokens and expiry from the user object
      if (user) {
        const credentials = user as unknown as AuthUserApiResponse;
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: new Date(
            credentials.accessTokenExpiresAt,
          ).getTime(),
          userId: user.id,
        };
      }

      // Access token is still valid — return as-is
      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }

      // Access token has expired — attempt refresh
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
      }
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
