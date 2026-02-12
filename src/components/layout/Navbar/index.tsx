import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { DefaultSession, getServerSession } from 'next-auth';

import LoginNavBtn from './LoginNavBtn';
import NavLinks from './NavLinks';
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
    <div className='flex items-center justify-between border-y border-grayish-50 bg-white px-6 py-3.5 lg:px-[4.5rem]'>
      <div className='flex items-center gap-8'>
        <Link href='/'>
          <Image
            src='/images/logo.png'
            alt='Logo'
            fill
            className='!static !h-8 !w-20'
          />
        </Link>
        <NavLinks />
      </div>

      <QueryClientProvider>
        {isAuth ? <UserDropdown {...{ userName, token }} /> : <LoginNavBtn />}
      </QueryClientProvider>
    </div>
  );
}
