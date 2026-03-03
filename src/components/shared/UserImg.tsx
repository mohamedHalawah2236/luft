import React from 'react';

import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';

type UserImgProps = {
  image?: string;
  className?: string;
};

export default function UserImg({ className }: UserImgProps) {
  const session = useSession().data as DefaultSession & {
    accessToken: string;
  };

  const userName = session?.user?.name ?? '';

  const firstName = userName?.split(' ')[0];
  const lastName = userName?.split(' ')[1];
  const firstNameLetter = firstName?.[0];
  const lastNameLetter = lastName?.[0];

  return (
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-full bg-grayish-900 p-2 text-xl font-medium text-grayish-50',
        className,
      )}
    >
      <span className='size-fit'>
        {firstNameLetter?.toUpperCase()}
        {lastNameLetter?.toUpperCase()}
      </span>
    </div>
  );
}
