'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import VerifyOTPForm from '../VerifyOtp';
import RequestOtpForm from './RequestOtpForm';

export default function ChangeEmailForm() {
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [identifier, setIdentifier] = useState('');

  const tCommon = useTranslations('common');

  if (!isOtpSent)
    return (
      <RequestOtpForm
        setIdentifier={setIdentifier}
        setIsOtpSent={setIsOtpSent}
      />
    );

  return <VerifyOTPForm identifier={identifier} />;
}
