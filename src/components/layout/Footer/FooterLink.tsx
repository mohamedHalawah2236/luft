'use client';

import Link from 'next/link';

import { NavLinkProps } from '@/types/components';

import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

export default function FooterLink({ id, title, href }: NavLinkProps) {
  const params = useParams();

  const currentId = params?.id as string;
  const isActive = currentId === id;

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
