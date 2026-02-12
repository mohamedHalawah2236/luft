'use client';
import React from 'react';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import ConfirmModal from '@/components/shared/ConfirmModal';

import { SetState } from '@/types';

import { logout } from '@/api/auth';

type ConfirmLogoutModalProps = {
  token: string;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
};

export default function ConfirmLogoutModal({
  token,
  isOpen,
  setIsOpen,
}: ConfirmLogoutModalProps) {
  const t = useTranslations('common');
  const tLogout = useTranslations('auth.logout');

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
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={mutate}
      onCancel={() => setIsOpen(false)}
      isActionsDisabled={isPending || isSuccess}
    >
      <p className='text-2xl font-medium text-error-600 max-md:text-xl'>
        {tLogout('confirm')}
      </p>
    </ConfirmModal>
  );
}
