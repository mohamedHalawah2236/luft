import { UserSession } from '@/types/session';
import { cookies } from 'next/headers';

export const getServerSession = async (): Promise<UserSession | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) return null;
  const accessTokenExpiresAt =
    cookieStore.get('accessTokenExpiresAt')?.value ?? '';
  const refreshTokenExpiresAt =
    cookieStore.get('refreshTokenExpiresAt')?.value ?? '';

  const userData = JSON.parse(cookieStore.get('user')?.value ?? '{}');

  return {
    accessToken: accessToken ?? '',
    accessTokenExpiresAt: accessTokenExpiresAt
      ? new Date(accessTokenExpiresAt).getTime()
      : Date.now(),
    refreshToken: refreshToken ?? '',
    refreshTokenExpiresAt: refreshTokenExpiresAt
      ? new Date(refreshTokenExpiresAt).getTime()
      : Date.now(),
    user: userData,
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

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('accessTokenExpiresAt');
  cookieStore.delete('refreshTokenExpiresAt');
  cookieStore.delete('user');
};
