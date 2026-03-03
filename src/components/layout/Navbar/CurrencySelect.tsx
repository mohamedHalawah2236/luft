'use client';
import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import DollarIcon from '@/components/icons/DollarIcon';
import Select from '@/components/shared/Select';

export default function CurrencySelect() {
  const [value, setValue] = useState('');
  const t = useTranslations('common');

  return (
    <Select
      label={t('currency')}
      options={[]}
      onChange={() => {}}
      placeholder='EGP'
      value={value}
      disabled
      labelIcon={<DollarIcon className='size-5' />}
    />
  );
}
