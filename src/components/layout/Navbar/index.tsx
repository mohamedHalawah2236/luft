import React from 'react';

import Link from 'next/link';
import { DefaultSession, getServerSession } from 'next-auth';

import Logo from '@/components/icons/Logo';

import MobileNavSheet from './Mobile/MobileNavSheet';
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
      <div className='flex items-center gap-8 max-sm:gap-6'>
        <div className='h-fit sm:hidden'>
          <MobileNavSheet />
        </div>
        <Link href='/'>
          <Logo className='h-8 w-20' />
        </Link>
        <div className='max-sm:hidden'>
          <NavLinks />
        </div>
      </div>

      <QueryClientProvider>
        {isAuth ? <UserDropdown {...{ userName, token }} /> : <LoginNavBtn />}
      </QueryClientProvider>
    </div>
  );
}
