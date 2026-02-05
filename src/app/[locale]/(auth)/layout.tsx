import React, { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AuthBanner from './_components/AuthBanner';

import QueryClientProvider from '@/providers/QueryClientProvider';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex size-full justify-between gap-8 overflow-auto bg-grayish-30 max-lg:items-center lg:p-2 2xl:mx-auto 2xl:max-w-[75%] 2xl:p-10'>
      <div className='flex max-h-full flex-1 flex-col gap-8 overflow-auto max-lg:p-4 max-lg:px-10 max-md:px-3.5 lg:gap-12 lg:pe-1 lg:ps-6'>
        <Link
          href='/'
          className='mt-2 size-fit max-lg:mx-auto lg:mt-11'
        >
          <Image
            src='/images/logo.png'
            alt='Logo'
            fill
            className='!static !h-7 !w-[4.25rem]'
          />
        </Link>
        <QueryClientProvider>{children}</QueryClientProvider>
      </div>
      <AuthBanner />
    </div>
  );
}
