'use client';
import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ChevronDown, Heart, Settings } from 'lucide-react';

import KeyIcon from '@/components/icons/KeyIcon';
import Dropdown from '@/components/shared/Dropdown';

import ConfirmLogoutModal from './logout/ConfirmLogoutModal';

import { DropDownItem } from '@/types/components';

import { cn } from '@/lib/utils';

type UserDropdownProps = {
  userName: string;
  token: string;
};

export default function UserDropdown({ userName, token }: UserDropdownProps) {
  const t = useTranslations('common');
  const firstName = userName?.split(' ')[0];
  const lastName = userName?.split(' ')[1];
  const firstNameLetter = firstName?.[0];
  const lastNameLetter = lastName?.[0];

  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const userItems: DropDownItem[] = [
    {
      label: t('navLinks.settings'),
      disabled: true,
      onClick: () => {},
      icon: <Settings className='!size-5' />,
    },
    {
      label: t('navLinks.reservations'),
      disabled: true,
      onClick: () => {},
      icon: <KeyIcon className='!size-5' />,
    },
    {
      label: t('navLinks.wishlist'),
      disabled: true,
      onClick: () => {},
      icon: <Heart className='!size-5 fill-grayish-900' />,
    },
    {
      label: t('logout'),
      onClick: () => setIsConfirmLogoutOpen(true),
      className: 'mt-4',
    },
  ];

  return (
    <>
      <span className='flex size-10 items-center justify-center rounded-full bg-grayish-900 p-2 text-xl font-medium text-grayish-50 sm:hidden'>
        {firstNameLetter?.toUpperCase()}
        {lastNameLetter?.toUpperCase()}
      </span>

      <div className='max-sm:hidden'>
        <Dropdown
          isOpen={isDropdownOpen}
          setIsopen={setisDropdownOpen}
          items={userItems}
          className='rounded-lg border-0 py-4'
          itemClassName='py-2.5 px-4 !hover:bg-grayish-100 disabled:opacity-50'
          align='center'
          trigger={
            <div className='flex items-center gap-2'>
              <span className='flex size-10 items-center justify-center rounded-full bg-grayish-900 p-2 text-xl font-medium text-grayish-50'>
                {firstNameLetter?.toUpperCase()}
                {lastNameLetter?.toUpperCase()}
              </span>
              <ChevronDown
                className={cn('size-6 stroke-grayish-400 transition-all', {
                  'rotate-180': isDropdownOpen,
                })}
              />
            </div>
          }
          triggerClassName='focus:outline-none'
        />
        <ConfirmLogoutModal
          token={token}
          isOpen={isConfirmLogoutOpen}
          setIsOpen={setIsConfirmLogoutOpen}
        />
      </div>
    </>
  );
}
