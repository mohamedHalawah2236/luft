import Link from 'next/link';
import { DefaultSession, getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { Heart, Menu } from 'lucide-react';

import GearIcon from '@/components/icons/GearIcon';
import KeyIcon from '@/components/icons/KeyIcon';
import RatedByGuests from '@/components/shared/RatedByGuests';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

import SocialMediaItem from '../../Footer/SocialMediaItem';
import CurrencySelect from '../CurrencySelect';

import LogoutBtn from './LogoutBtn';
import UserLink from './UserSetting';

import { socialLinks } from '@/constants/links';
import { getNavLinks } from '@/constants/nav';

import { authOptions } from '@/lib/auth';

async function MobileNavSheet() {
  const t = await getTranslations('');
  const navLinks = getNavLinks(t);
  const session = (await getServerSession(authOptions)) as DefaultSession & {
    accessToken: string;
  };

  const token = session?.accessToken ?? '';

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6' />
      </SheetTrigger>
      <SheetContent className='flex w-10/12 flex-col justify-between overflow-auto bg-white p-0'>
        <div className='flex flex-col gap-4 px-4 pt-4'>
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
              icon={<GearIcon className='!size-6 fill-grayish-500' />}
              href='settings'
            />
            <UserLink
              label='My Reservations'
              icon={<KeyIcon className='!size-6 fill-grayish-500' />}
              href='reservations'
            />
            <UserLink
              label='Wishlist'
              icon={<Heart className='!size-6 fill-grayish-500' />}
              href='whishlist'
            />
          </div>
          <hr className='text-grayish-100' />
          <CurrencySelect />
          <LogoutBtn token={token} />
        </div>
        <SheetFooter className='flex flex-col bg-grayish-50 px-4 py-4'>
          <RatedByGuests
            textClassName='text-sm'
            color='var(--ps-neutral-500)'
          />
          <div className='mt-6 flex items-center gap-5'>
            {socialLinks.map(({ icon, link }, i) => (
              <SocialMediaItem
                key={link + i}
                {...{ icon, link }}
              />
            ))}
          </div>
          <hr className='my-2 text-grayish-100' />
          <div className='flex flex-col gap-2.5 text-sm text-grayish-500'>
            <p>Terms of service</p>
            <p>All Rights Reserved © 2025 Luft Stay .</p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
