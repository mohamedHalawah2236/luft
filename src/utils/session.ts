import { UserSession } from '@/types/session';
import { cookies } from 'next/headers';

export const getServerSession = async (): Promise<UserSession | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) return null;
  const accessTokenExpiresAt =
    cookieStore.get('accessTokenExpiresAt')?.value ?? '';
  const refreshTokenExpiresAt =
    cookieStore.get('refreshTokenExpiresAt')?.value ?? '';

  return {
    accessToken,
    accessTokenExpiresAt: accessTokenExpiresAt
      ? new Date(accessTokenExpiresAt).getTime()
      : Date.now(),
    refreshToken,
    refreshTokenExpiresAt: refreshTokenExpiresAt
      ? new Date(refreshTokenExpiresAt).getTime()
      : Date.now(),
  };
};

export const setUserSession = async (session: UserSession) => {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', session.accessToken);
  cookieStore.set('refreshToken', session.refreshToken);
  cookieStore.set(
    'accessTokenExpiresAt',
    session.accessTokenExpiresAt.toString(),
  );
  cookieStore.set(
    'refreshTokenExpiresAt',
    session.refreshTokenExpiresAt.toString(),
  );
};
