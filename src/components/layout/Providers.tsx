'use client';

import { ReactNode } from 'react';

import { DefaultSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSessionError } from '@/hooks/useSessionError';

function SessionErrorHandler({ children }: { children: ReactNode }) {
  useSessionError();
  return <>{children}</>;
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
      <SessionErrorHandler>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionErrorHandler>
    </SessionProvider>
  );
}
