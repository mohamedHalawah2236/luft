'use client';
import React, { useState } from 'react';

import BackToLoginLink from './_components/BackToLoginLink';
import ForgetPasswordForm from './_components/ForgetPasswordForm';
import ResetPasswordForm from './_components/ResetPasswordForm';
import VerifyForgetPasswordOTPForm from './_components/VerifyForgetPasswordOTPForm';

export default function ForgetPasswordPage() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [validationKey, setValidationKey] = useState<string | undefined>(
    undefined,
  );
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const isOtpVerified = !!validationKey;

  if (!isOtpSent)
    return (
      <div className='flex flex-col'>
        <ForgetPasswordForm
          setIsOtpSent={setIsOtpSent}
          setUserEmail={setUserEmail}
        />
        <BackToLoginLink />
      </div>
    );

  if (!isOtpVerified)
    return (
      <VerifyForgetPasswordOTPForm
        setValidationKey={setValidationKey}
        userEmail={userEmail || ''}
      />
    );

  return <ResetPasswordForm validationKey={validationKey} />;
}
