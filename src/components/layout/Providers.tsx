'use client';

import { ReactNode, useEffect } from 'react';

import { DefaultSession } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { setSessionUpdate } from '@/utils/api';

function SessionUpdateInitializer() {
  const { update } = useSession();

  useEffect(() => {
    setSessionUpdate(update);
  }, [update]);

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
      <SessionUpdateInitializer />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
