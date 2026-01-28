'use client';
import React from 'react';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { logout } from '@/api/auth';

export default function LogoutNavBtn({ token }: { token: string }) {
  const t = useTranslations('common');

  const { mutate, isPending } = useMutation({
    mutationFn: () => logout(token),
    onSettled: () => {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    },
  });

  return (
    <Button
      type='button'
      variant='link'
      onClick={() => mutate()}
      disabled={isPending}
    >
      {t('buttons.logout')}
    </Button>
  );
}
