import React, { ReactNode } from 'react';

import Link from 'next/link';

type UserLinkProps = {
  label: string;
  icon: ReactNode;
  href: string;
};

export default function UserLink({ label, icon, href }: UserLinkProps) {
  return (
    <Link
      type='button'
      className='flex items-center gap-2'
      href={href}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
