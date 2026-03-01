'use client';
import React, { useState } from 'react';

import DollarIcon from '@/components/icons/DollarIcon';
import Select from '@/components/shared/Select';

export default function CurrencySelect() {
  const [value, setValue] = useState('');
  return (
    <Select
      label='Currency'
      options={[]}
      onChange={() => {}}
      placeholder='EGP'
      value={value}
      disabled
      labelIcon={<DollarIcon className='size-5' />}
    />
  );
}
