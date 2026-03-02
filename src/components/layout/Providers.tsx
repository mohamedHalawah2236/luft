'use client';

import { ReactNode } from 'react';

import { DefaultSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import QueryClientProvider from '@/providers/QueryClientProvider';

export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: DefaultSession;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
