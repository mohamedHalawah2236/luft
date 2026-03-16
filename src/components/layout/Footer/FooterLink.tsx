'use client';

import Link from 'next/link';

import { NavLinkProps } from '@/types/components';

import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function FooterLink({ title, href }: NavLinkProps) {
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');
  const currPathname = `/${pathnameWithoutLocale}`;

  const isActive = currPathname === href;

  return (
    <Link
      href={href}
      className={cn('text-grayish-100 sm:text-lg', {
        'font-medium text-grayish-30': isActive,
      })}
    >
      {title}
    </Link>
  );
}
