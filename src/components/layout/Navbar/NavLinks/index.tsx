import React from 'react';

import { getTranslations } from 'next-intl/server';

import NavLink from './NavLink';

import { NavLinkProps } from '@/types/components';

export default async function NavLinks() {
  const t = await getTranslations('common.labels');
  console.log(t('email'));

  const links: NavLinkProps[] = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'For Owners',
      href: '/owners',
    },
    {
      title: 'About Us',
      href: '/about',
    },
    {
      title: 'Contact Us',
      href: '/contact',
    },
  ];

  return (
    <div className='flex items-center gap-6'>
      {links.map(({ title, href }) => (
        <NavLink
          key={title}
          {...{ title, href }}
        />
      ))}
    </div>
  );
}
