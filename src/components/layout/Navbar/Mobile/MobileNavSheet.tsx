import Link from 'next/link';
import { DefaultSession, getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { Heart, Menu } from 'lucide-react';

import GearIcon from '@/components/icons/GearIcon';
import KeyIcon from '@/components/icons/KeyIcon';
import RatedByGuests from '@/components/shared/RatedByGuests';
import {
  Sheet,
  SheetClose,
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
      <SheetContent className='flex w-10/12 flex-col justify-between overflow-auto bg-white p-0 [&>button]:end-4 [&>button]:right-auto [&>button]:w-fit'>
        <div className='flex flex-col gap-4 px-4 pt-4'>
          <div className='flex flex-col gap-4'>
            {navLinks.map(({ title, href }) => (
              <SheetClose
                asChild
                key={title + 'mobileSidebar'}
              >
                <Link
                  href={href}
                  className='text-grayish-900'
                >
                  {title}
                </Link>
              </SheetClose>
            ))}
          </div>
          <hr className='text-grayish-100' />
          <div className='flex flex-col gap-[1.1rem]'>
            <UserLink
              label={t('common.navLinks.settings')}
              icon={<GearIcon className='!size-6 fill-grayish-500' />}
              href='/settings'
            />

            <UserLink
              label={t('common.navLinks.reservations')}
              icon={<KeyIcon className='!size-6 fill-grayish-500' />}
              href='reservations'
            />
            <UserLink
              label={t('common.navLinks.wishlist')}
              icon={
                <Heart className='!size-6 fill-grayish-500 stroke-grayish-500' />
              }
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
            <p>{t('footer.termsOfService')}</p>
            <p>{t('footer.allRightsReserved')}</p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
