'use client';
import React, { useState } from 'react';

import { ChevronDown, Heart, Key, Settings } from 'lucide-react';

import Dropdown from '@/components/shared/Dropdown';

import ConfirmLogoutModal from './logout/ConfirmLogoutModal';

import { DropDownItem } from '@/types/components';

type UserDropdownProps = {
  userName: string;
  token: string;
};

export default function UserDropdown({ userName, token }: UserDropdownProps) {
  const firstName = userName?.split(' ')[0];
  const lastName = userName?.split(' ')[1];
  const firstNameLetter = firstName?.[0];
  const lastNameLetter = lastName?.[0];

  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const userItems: DropDownItem[] = [
    {
      label: 'Account Settings',
      disabled: true,
      onClick: () => {},
      icon: <Settings className='!size-5' />,
    },
    {
      label: 'My Reservations',
      disabled: true,
      onClick: () => {},
      icon: <Key className='!size-5' />,
    },
    {
      label: 'Wishlist',
      disabled: true,
      onClick: () => {},
      icon: <Heart className='!size-5 fill-grayish-900' />,
    },
    {
      label: 'Logout',
      onClick: () => setIsConfirmLogoutOpen(true),
      className: '',
    },
  ];

  return (
    <>
      <Dropdown
        items={userItems}
        className='rounded-lg border-0 py-4'
        itemClassName='py-2.5 px-4 !hover:bg-grayish-100 disabled:opacity-50'
        align='start'
        trigger={
          <div className='flex items-center gap-2'>
            <span className='flex size-10 items-center justify-center rounded-full bg-grayish-900 p-2 text-xl font-medium text-grayish-50'>
              {firstNameLetter?.toUpperCase()}
              {lastNameLetter?.toUpperCase()}
            </span>

            <ChevronDown className='size-6 stroke-grayish-400' />
          </div>
        }
      />
      <ConfirmLogoutModal
        token={token}
        isOpen={isConfirmLogoutOpen}
        setIsOpen={setIsConfirmLogoutOpen}
      />
    </>
  );
}
