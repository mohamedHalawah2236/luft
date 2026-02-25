'use client';
import React, { useState } from 'react';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import ConfirmModal from '@/components/shared/ConfirmModal';
import { Button } from '@/components/ui/button';

import { logout } from '@/api/auth';

export default function LogoutNavBtn({ token }: { token: string }) {
  const t = useTranslations('common');
  const tLogout = useTranslations('auth.logout');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => logout(token),
    onSettled: () => {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    },
  });

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={mutate}
        onCancel={() => setIsConfirmOpen(false)}
        isActionsDisabled={isPending || isSuccess}
      >
        <div className='flex flex-col items-center gap-6'>
          <Image
            src='images/auth/logoutConfirm.png'
            alt='Logout'
            width={98.73619842529297}
            height={185}
          />
          <div className='flex flex-col items-center gap-2 text-center'>
            <h4 className='text-xl font-medium'>{tLogout('title')}</h4>
            <p className='text-neutral-400'>{tLogout('logBack')}</p>
          </div>
        </div>
      </ConfirmModal>
      <Button
        type='button'
        variant='link'
        onClick={() => setIsConfirmOpen(true)}
        disabled={isPending || isSuccess}
      >
        {t('buttons.logout')}
      </Button>
    </>
  );
}
