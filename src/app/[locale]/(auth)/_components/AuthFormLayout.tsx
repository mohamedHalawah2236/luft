import React, { ReactNode } from 'react';

import { useFormContext } from 'react-hook-form';

import FormServerError from '@/components/shared/FormServerError';
import Overlay from '@/components/shared/Overlay';
import { Button } from '@/components/ui/button';

type AuthFormLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  submitBtnLabel: string;
  serverError?: string;
  isFormRedirecting?: boolean;
};

export default function AuthFormLayout({
  title,
  description,
  children,
  submitBtnLabel,
  serverError,
  isFormRedirecting,
}: AuthFormLayoutProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-[2rem] font-medium text-grayish-900 max-sm:text-2xl'>
          {title}
        </h2>
        <p className='text-lg font-normal text-grayish-400 max-sm:text-base'>
          {description}
        </p>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='relative flex flex-col gap-4'>
          {children}
          {isFormRedirecting && <Overlay />}
        </div>
        <div className='flex flex-col gap-2'>
          {serverError && <FormServerError>{serverError}</FormServerError>}

          <Button
            variant={'default'}
            className='h-12 py-3.5'
            type='submit'
            disabled={isSubmitting || isFormRedirecting}
          >
            {submitBtnLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
