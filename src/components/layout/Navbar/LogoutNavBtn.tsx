'use client';
import React, { useState } from 'react';

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
        <p className='text-2xl font-medium text-error-600 max-md:text-xl'>
          {tLogout('confirm')}{' '}
        </p>
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
