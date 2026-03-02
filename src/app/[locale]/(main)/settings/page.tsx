import React from 'react';

import Link from 'next/link';

import { CircleChevronLeftIcon } from 'lucide-react';

import ProfileForm from './_components/ProfileForm';

export default function SettingsPage() {
  return (
    <div className='flex w-full gap-8 max-md:flex-col max-md:gap-6 max-md:py-20 max-sm:pb-40 max-sm:pt-6 md:py-14'>
      {/* Section Title */}
      <div className='flex gap-4 max-md:items-center md:flex-col'>
        <Link
          href='/'
          className='w-fit max-sm:hidden'
        >
          <CircleChevronLeftIcon className='size-10 stroke-1 text-grayish-900' />
        </Link>
        <div className='flex flex-col gap-2'>
          <h6 className='text-2xl font-medium text-grayish-900 sm:text-[1.75rem] md:max-w-36 md:text-[2rem]'>
            Account Settings
          </h6>
          <p className='text-lg text-grayish-400 md:hidden'>
            Setup and edit your account profile
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='flex flex-1 flex-col gap-12'>
        <p className='text-lg text-grayish-400 max-md:hidden'>
          Setup and edit your account profile
        </p>

        <ProfileForm />
      </div>
    </div>
  );
}
