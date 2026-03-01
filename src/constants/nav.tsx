import { TFunction } from '.';

import { NavLinkProps } from '@/types/components';

export const getNavLinks = (t: TFunction): NavLinkProps[] => [
  {
    title: t('common.navLinks.home'),
    href: '/',
  },
  {
    title: t('common.navLinks.owners'),
    href: '/owners',
  },
  {
    title: t('common.navLinks.about'),
    href: '/about',
  },
  {
    title: t('common.navLinks.contact'),
    href: '/contact',
  },
];
