'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useSessionError() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // Token refresh failed, redirect to login
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    }
  }, [session, router]);
}
