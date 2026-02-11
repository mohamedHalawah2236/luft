import React from 'react';

import { useTranslations } from 'next-intl';

import AirbnbIcon from '@/components/icons/AirbnbIcon';

import AppRate from '@/app/[locale]/(auth)/_components/AppRate';

export default function RatingByHeader() {
  const numOfGuests = 1000;
  const rate = 4.8;
  const t = useTranslations('auth.banner');

  return (
    <div className='flex flex-col items-center justify-center gap-4 bg-grayish-50 py-4 leading-5'>
      <div className='flex text-grayish-900'>
        <AppRate
          rate={rate}
          className='text-grayish-900'
          starClassName='fill-grayish-900'
        />
        <p className='me-2 ms-1'>
          {t('ratedBy', {
            numOfGuests,
          })}
        </p>
        <AirbnbIcon />
      </div>
    </div>
  );
}
