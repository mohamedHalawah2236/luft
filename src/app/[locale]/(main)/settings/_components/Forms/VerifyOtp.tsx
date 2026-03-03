'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomOtpInput from '@/components/shared/form/CustomOtpInput';
import { Form } from '@/components/ui/form';

import {
  VerifyOtpPreregisterFormData,
  VerifyOtpPreregisterResponse,
} from '@/types/auth';

import { resendOtpPreregister, verifyOtpPreregister } from '@/api/auth';
import ResendOTP from '@/app/[locale]/(auth)/_components/ResendOTP';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldFormLayout from './FieldFormLayout';

type VerifyOTPFormProps = {
  identifier: string;
};

export default function VerifyOTPForm({ identifier }: VerifyOTPFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');
  const t = useTranslations('auth.verifyOTP');

  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const numOfDigits = process.env.NEXT_PUBLIC_NUM_OF_OTP_DIGITS ?? 6;

  const formSchema = z.object({
    otp: z
      .string()
      .min(1, { message: tCommon('validations.otp.required') })
      .refine(
        (otp) => otp.length === +numOfDigits,
        tCommon('validations.otp.invalidLength'),
      ),
    identifier: z
      .string({ required_error: tCommon('validations.firstName.required') })
      .min(1, { message: tCommon('validations.firstName.required') }),
    type: z.number(),
    purpose: z.number(),
    registrationKey: z.string().min(1, 'required'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      identifier,
      type: 1,
      purpose: 1,
    },
  });

  const { mutateAsync } = useMutation<
    VerifyOtpPreregisterResponse,
    Error,
    VerifyOtpPreregisterFormData
  >({
    mutationFn: verifyOtpPreregister,
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: () => {},
    onError: (error: Error) => setServerError(error.message),
  });

  const { mutate: ResendOTPMutate, isPending: isResendingOtp } = useMutation<
    VerifyOtpPreregisterResponse,
    Error,
    string
  >({
    mutationFn: resendOtpPreregister,
    onSuccess: () => {
      setIsResendDisabled(true);
      toast.success(tCommon('toaster.otpSent'));
    },
    onError: () => toast.error(tCommon('toaster.failedToSendOtp')),
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  const onResendOtp = () => {
    if (identifier) ResendOTPMutate(identifier);
  };

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit}>
        <FieldFormLayout
          title={t('title')}
          description={t('description', { numOfDigits, userEmail: identifier })}
          submitBtnLabel={tCommon('buttons.change')}
          serverError={serverError}
          className='gap-8'
        >
          <div className='flex flex-col items-center gap-4'>
            <CustomOtpInput
              numOfDigits={+numOfDigits}
              fieldName='otp'
            />
            <ResendOTP
              {...{
                isResendDisabled,
                setIsResendDisabled,
                onResend: onResendOtp,
                isResending: isResendingOtp,
              }}
            />
          </div>
        </FieldFormLayout>
      </form>
    </Form>
  );
}
