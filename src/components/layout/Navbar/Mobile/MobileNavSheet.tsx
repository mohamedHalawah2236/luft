import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Heart, Key, Menu, Settings } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

import UserLink from './UserSetting';

import { getNavLinks } from '@/constants/nav';

async function MobileNavSheet() {
  const t = await getTranslations('');
  const navLinks = getNavLinks(t);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6' />
      </SheetTrigger>
      <SheetContent className='p-0'>
        <div className='flex flex-col gap-4 bg-white px-4 pt-4'>
          <div className='flex flex-col gap-4'>
            {navLinks.map(({ title, href }) => (
              <Link
                href={href}
                key={title + 'mobileSidebar'}
                className='text-grayish-900'
              >
                {title}
              </Link>
            ))}
          </div>
          <hr className='text-grayish-100' />
          <div className='flex flex-col gap-[1.1rem]'>
            <UserLink
              label='Account Settings'
              icon={<Settings className='!size-6 stroke-grayish-900' />}
              href='settings'
            />
            <UserLink
              label='My Reservations'
              icon={<Key className='!size-6 stroke-grayish-900' />}
              href='reservations'
            />
            <UserLink
              label='Wishlist'
              icon={<Heart className='!size-6 fill-grayish-900' />}
              href='whishlist'
            />
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
