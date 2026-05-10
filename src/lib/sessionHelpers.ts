import { getSession } from 'next-auth/react';

/**
 * Get the current session and check for authentication errors
 * Use this in client components when you need to access the session
 * Token refresh happens automatically in the JWT callback
 */
export async function getValidSession() {
  const session = await getSession({ broadcast: true });

  if (session?.error === 'RefreshAccessTokenError') {
    // Session refresh failed, user needs to re-authenticate
    return null;
  }

  return session;
}
