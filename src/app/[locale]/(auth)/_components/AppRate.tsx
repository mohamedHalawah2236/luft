import React from 'react';

import StarIcon from '@/components/icons/StarIcon';

export default function AppRate({ rate }: { rate: number }) {
  return (
    <div className='flex gap-0.5 text-white'>
      <StarIcon className='size-5 fill-white' />
      <span>{rate}</span>
    </div>
  );
}
