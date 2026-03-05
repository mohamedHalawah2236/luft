'use client';

import { useState } from 'react';

import VerifyOTPForm from '../VerifyOtp';

import { IDENTIFIER_TYPE, OTP_PURPOSE } from '@/types/settings';
import RequestOtpForm from './RequestOtpForm';

export default function ChangePhoneForm() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [identifier, setIdentifier] = useState('');

  if (!isOtpSent)
    return (
      <RequestOtpForm
        setIdentifier={setIdentifier}
        setIsOtpSent={setIsOtpSent}
      />
    );

  return (
    <VerifyOTPForm
      identifier={identifier}
      identifierType={IDENTIFIER_TYPE.Phone}
      otpPurpose={OTP_PURPOSE.UpdatePhone}
    />
  );
}
