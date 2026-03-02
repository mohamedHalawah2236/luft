import React from 'react';

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';

import ProfileForm from './_components/ProfileForm';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations('settings');
  const { locale } = await params;
  const isRtl = locale === 'ar';

  return (
    <div className='flex w-full gap-8 max-md:flex-col max-md:gap-6 max-md:py-20 max-sm:pb-40 max-sm:pt-6 md:py-14'>
      {/* Section Title */}
      <div className='flex gap-4 max-md:items-center md:flex-col'>
        <Link
          href='/'
          className='w-fit max-sm:hidden'
        >
          {isRtl ? (
            <CircleChevronRightIcon className='size-10 stroke-1 text-grayish-900' />
          ) : (
            <CircleChevronLeftIcon className='size-10 stroke-1 text-grayish-900' />
          )}
        </Link>
        <div className='flex flex-col gap-2'>
          <h6 className='text-2xl font-medium text-grayish-900 sm:text-[1.75rem] md:max-w-36 md:text-[2rem]'>
            {t('title')}
          </h6>
          <p className='text-lg text-grayish-400 md:hidden'>
            {t('description')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='flex flex-1 flex-col gap-12'>
        <p className='text-lg text-grayish-400 max-md:hidden'>
          {t('description')}
        </p>

        <ProfileForm />
      </div>
    </div>
  );
}
