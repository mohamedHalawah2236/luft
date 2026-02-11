import React from 'react';

import StarIcon from '@/components/icons/StarIcon';

import { cn } from '@/lib/utils';

export default function AppRate({
  rate,
  className,
  starClassName,
}: {
  rate: number;
  className?: string;
  starClassName?: string;
}) {
  return (
    <div className={cn('flex gap-0.5 text-white', className)}>
      <StarIcon className={cn('size-5 fill-white', starClassName)} />
      <span>{rate}</span>
    </div>
  );
}
