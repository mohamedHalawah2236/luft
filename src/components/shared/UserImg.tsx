import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { getTextLocale } from '@/utils/language';

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

  const textLocale = getTextLocale(userName);
  const isArabicName = textLocale === 'ar';

  return (
    <div
      dir='ltr'
      className={cn(
        'flex size-10 items-center justify-center gap-px rounded-full bg-grayish-900 p-2 text-xl font-medium text-grayish-50',
        className,
      )}
    >
      {firstNameLetter?.toUpperCase()}
      {isArabicName && <>&nbsp;</>}
      {lastNameLetter?.toUpperCase()}
    </div>
  );
}
