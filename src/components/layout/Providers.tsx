'use client';

import { ReactNode, useEffect } from 'react';

import { DefaultSession } from 'next-auth';
import { SessionProvider, signOut, useSession } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function SessionGuard() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/login' });
    }
  }, [session?.error]);

  return null;
}

export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: DefaultSession;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <SessionGuard />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
