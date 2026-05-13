'use client';
import React from 'react';

import { useTranslations } from 'next-intl';

import SetPasswordForm from '../../_components/SetPasswordForm';

import { setRegisteredUserPasswordAction } from '../../actions';

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
        setRegisteredUserPasswordAction({ password, registrationKey })
      }
      onSubmissionSuccess={() => {
        // Redirect to home
        window.location.href = '/';
      }}
    />
  );
}
