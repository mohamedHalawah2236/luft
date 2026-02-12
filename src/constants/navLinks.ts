import { TFunction } from '.';

import { NavLinkProps } from '@/types/components';

export const getNavLinks = (t: TFunction): NavLinkProps[] => [
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
