import React from 'react';

import { cn } from '@/lib/utils';

type ContactItemProps = {
  label: string;
  value: string;
  className?: string;
};

export default function ContactItem({
  label,
  value,
  className,
}: ContactItemProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h5 className='text-sm leading-6'>{label}</h5>
      <p className='text-lg'>{value}</p>
    </div>
  );
}
