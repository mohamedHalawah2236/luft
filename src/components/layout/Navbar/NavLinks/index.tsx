import React from 'react';

import { getTranslations } from 'next-intl/server';

import NavLink from './NavLink';

import { getNavLinks } from '@/constants/nav';

export default async function NavLinks() {
  const t = await getTranslations();

  const navLinks = getNavLinks(t);

  return (
    <div className='flex items-center gap-6'>
      {navLinks.map(({ title, href }) => (
        <NavLink
          key={title}
          {...{ title, href }}
        />
      ))}
    </div>
  );
}
