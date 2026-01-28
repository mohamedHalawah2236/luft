import React, { ReactNode } from 'react';

import Image from 'next/image';

import AuthBanner from './_components/AuthBanner';

import QueryClientProvider from '@/providers/QueryClientProvider';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex size-full justify-between gap-8 overflow-auto bg-grayish-30 p-2 max-lg:px-10 max-md:px-5 2xl:mx-auto 2xl:max-w-[75%] 2xl:p-10'>
      <div className='flex max-h-full flex-1 flex-col gap-8 overflow-auto pe-1 lg:gap-12 lg:ps-6'>
        <Image
          src='/images/logo.png'
          alt='Logo'
          fill
          className='!static mt-2 !h-7 !w-[4.25rem] max-lg:mx-auto lg:mt-11'
        />
        <QueryClientProvider>{children}</QueryClientProvider>
      </div>
      <AuthBanner />
    </div>
  );
}
