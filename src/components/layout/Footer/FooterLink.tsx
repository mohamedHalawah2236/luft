'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { NavLinkProps } from '@/types/components';
import { PageTypeEnum } from '@/types/page';

import { cn } from '@/lib/utils';

export default function FooterLink({ id, title, pageType }: NavLinkProps) {
  const params = useParams();

  const currentId = params?.id as string;
  const isActive = currentId
    ? currentId === id
    : pageType === PageTypeEnum.Home;

  const href = pageType === PageTypeEnum.Home ? '/' : `/${id}`;

  return (
    <Link
      href={href}
      title={title}
      className={cn('line-clamp-1 text-grayish-100 sm:text-lg', {
        'font-medium text-grayish-30': isActive,
      })}
    >
      {title}
    </Link>
  );
}
