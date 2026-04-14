'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

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
import LanguageSwitcher from '../LanguageSwitcher';

import LogoutBtn from './LogoutBtn';
import MobileNavLink from './MobileNavLink';
import UserLink from './UserSetting';

import { Page, SocialMediaLink } from '@/types/layout';

import { Link } from '@/i18n/routing';

function MobileNavSheet({
  socialLinks,
  navLinks,
}: {
  socialLinks: SocialMediaLink[];
  navLinks: Page[];
}) {
  const t = useTranslations();
  const session = useSession();
  const token = session?.data?.accessToken ?? '';

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6' />
      </SheetTrigger>
<<<<<<< HEAD
      <SheetContent className='flex w-10/12 flex-col justify-between overflow-auto bg-white p-0 [&>button]:end-4 [&>button]:right-auto [&>button]:w-fit'>
        <div className='flex flex-1 flex-col gap-4 px-4 pt-4'>
=======
      <SheetContent className='flex w-10/12 flex-col justify-between overflow-auto bg-white p-0 sm:max-w-full [&>button]:end-4 [&>button]:right-auto [&>button]:w-fit'>
        <div className='flex flex-col gap-4 px-4 pt-4'>
>>>>>>> 110ef631297c5dd38887a178a2a5adf0a4e723d8
          <div className='flex flex-col gap-4'>
            {navLinks.map(({ title, id }) => (
              <MobileNavLink
                key={id}
                title={title}
                id={id}
              />
            ))}
          </div>
          <hr className='text-grayish-100' />
          <div className='flex flex-col gap-[1.1rem]'>
            <UserLink
              label={t('common.navLinks.settings')}
              icon={<GearIcon className='!size-6 fill-grayish-500' />}
              href='/account/settings'
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
          <CurrencySelect variant='mobile' />
          <LanguageSwitcher />
          {token && <LogoutBtn token={token} />}
        </div>
        <SheetFooter className='flex !flex-col bg-grayish-50 px-4 py-4'>
          <RatedByGuests
            textClassName='text-sm'
            color='var(--ps-neutral-500)'
          />
          <div className='mt-6 flex items-center gap-5'>
            {socialLinks.map(({ iconUrl, url, id }) => (
              <SocialMediaItem
                key={id}
                {...{ iconUrl, url }}
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
