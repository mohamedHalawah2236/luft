'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { NavLinkProps } from '@/types/components';
import { PageTypeEnum } from '@/types/page';

import { cn } from '@/lib/utils';

export default function NavLink({ title, id, pageType }: NavLinkProps) {
  const params = useParams();

  const currentId = params?.id as string;
  const isActive = currentId
    ? currentId === id
    : pageType === PageTypeEnum.Home;

  const href = pageType === PageTypeEnum.Home ? '/' : `/${id}`;

  return (
    <Link
      href={href}
      className={cn('text-grayish-300 hover:text-grayish-500', {
        'font-medium text-grayish-900 hover:text-current': isActive,
      })}
    >
      {title}
    </Link>
  );
}
