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
  return (
    <SessionContext.Provider {...{ value }}>{children}</SessionContext.Provider>
  );
}

export default SessionProvider;
