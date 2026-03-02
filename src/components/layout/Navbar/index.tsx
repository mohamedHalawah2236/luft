import React from 'react';

import Link from 'next/link';
import { DefaultSession, getServerSession } from 'next-auth';

import Logo from '@/components/icons/Logo';

import MobileNavSheet from './Mobile/MobileNavSheet';
import LoginNavBtn from './LoginNavBtn';
import NavLinks from './NavLinks';
import UserDropdown from './UserDropdown';

import { isLoggedIn } from '@/utils';

import { Locale } from '@/i18n/i18n.config';
import { authOptions } from '@/lib/auth';
import QueryClientProvider from '@/providers/QueryClientProvider';

export default async function Navbar({ locale }: { locale: Locale }) {
  const isAuth = await isLoggedIn();
  const session = (await getServerSession(authOptions)) as DefaultSession & {
    accessToken: string;
  };

  const userName = session?.user?.name ?? '';
  const token = session?.accessToken ?? '';

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

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
        {isAuth ? (
          <UserDropdown {...{ userName, token, dir }} />
        ) : (
          <LoginNavBtn />
        )}
      </QueryClientProvider>
    </div>
  );
}
