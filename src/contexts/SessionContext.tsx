import { createContext } from 'react';

import { UserSession } from '@/types/session';

export const SessionContext = createContext<UserSession | null>(null);

export function SessionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: UserSession | null;
}) {
  const isAccessTokenExpired =
    value && Date.now() >= new Date(value.accessTokenExpiresAt).getTime();

  return (
    <SessionContext.Provider
      value={
        value
          ? {
              ...value,
              accessToken: isAccessTokenExpired ? '' : value.accessToken,
            }
          : null
      }
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
