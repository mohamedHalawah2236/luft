import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthUserApiResponse } from '@/types/auth';

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
      }

      // No automatic token refresh here - it's handled in the API layer
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

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
