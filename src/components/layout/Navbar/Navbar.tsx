import React from 'react';

import Image from 'next/image';
import { DefaultSession, getServerSession } from 'next-auth';

import LoginNavBtn from './LoginNavBtn';
import LogoutNavBtn from './LogoutNavBtn';
import UserDropdown from './UserDropdown';

import { isLoggedIn } from '@/utils';

import { authOptions } from '@/lib/auth';
import QueryClientProvider from '@/providers/QueryClientProvider';

export default async function Navbar() {
  const isAuth = await isLoggedIn();
  const session = (await getServerSession(authOptions)) as DefaultSession & {
    accessToken: string;
  };

  const userName = session?.user?.name ?? '';
  const token = session?.accessToken ?? '';

  return (
    <div className='flex items-center justify-between bg-white px-8 py-3.5 lg:px-[4.5rem]'>
      <Image
        src='/images/logo.png'
        alt='Logo'
        fill
        className='!static !h-8 !w-20'
      />
      <QueryClientProvider>
        {isAuth ? (
          <>
            <UserDropdown {...{ userName, token }} />
            {/* <LogoutNavBtn token={session.accessToken} /> */}
          </>
        ) : (
          <LoginNavBtn />
        )}
      </QueryClientProvider>
    </div>
  );
}
