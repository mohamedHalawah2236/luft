'use client';
import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LoginNavBtn() {
  const t = useTranslations('common');
  return (
    <Link
      href={'/login'}
      className='flex h-10 w-[5.5rem] min-w-fit items-center justify-center rounded-full bg-grayish-900 px-3 text-grayish-50'
    >
      {t('buttons.login')}
    </Link>
  );
}
