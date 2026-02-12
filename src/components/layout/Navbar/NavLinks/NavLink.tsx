'use client';
import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavLinkProps } from '@/types/components';

import { cn } from '@/lib/utils';

export default function NavLink({ title, href }: NavLinkProps) {
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');
  const currPathname = `/${pathnameWithoutLocale}`;

  const isActive = currPathname === href;

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
