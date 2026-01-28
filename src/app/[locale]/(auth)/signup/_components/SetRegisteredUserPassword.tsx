'use client';
import React from 'react';

import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import SetPasswordForm from '../../_components/SetPasswordForm';

import { ApiResponse } from '@/types';
import { AuthUserApiResponse } from '@/types/auth';

import { setRegisteredUserPassword } from '@/api/auth';

export default function SetRegisteredUserPassword({
  registrationKey,
}: {
  registrationKey: string;
}) {
  const t = useTranslations('auth.signup');

  return (
    <SetPasswordForm
      title={t('setPassword.title')}
      description={t('setPassword.description')}
      submitBtnLabel={t('setPassword.buttonLabel')}
      onSubmit={({ password }) =>
        setRegisteredUserPassword({ password, registrationKey })
      }
      onSubmissionSuccess={(data) => {
        signIn('credentials', {
          redirect: true,
          callbackUrl: '/',
          ...(data as ApiResponse<AuthUserApiResponse>).result,
        });
      }}
    />
  );
}
