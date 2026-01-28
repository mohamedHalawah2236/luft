'use client';

import React, { ComponentProps, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Form } from '@/components/ui/form';

import AuthFormLayout from './AuthFormLayout';

import { isValidPassword } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type SetPasswordFormProps = Omit<
  ComponentProps<typeof AuthFormLayout>,
  'children'
> & {
  onSubmit: (values: {
    password: string;
    confirm_password: string;
  }) => Promise<any>;
  onSubmissionSuccess?: (data: unknown) => void;
};

export default function SetPasswordForm({
  title,
  description,
  submitBtnLabel,
  onSubmit,
  onSubmissionSuccess,
}: SetPasswordFormProps) {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');

  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, tCommon('validations.password.min'))
        .refine(isValidPassword, tCommon('validations.password.invalid')),
      confirm_password: z
        .string()
        .min(1, tCommon('validations.confirmPassword.required')),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: tCommon('validations.confirmPassword.mismatch'),
      path: ['confirm_password'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: onSubmit,
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: onSubmissionSuccess,
    onError: (error: Error) => setServerError(error.message),
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={onFormSubmit}
      >
        <AuthFormLayout
          {...{ title, description, submitBtnLabel, serverError }}
        >
          <CustomPasswordInput
            required
            fieldName='password'
            label={tCommon('labels.password')}
            placeholder={tCommon('placeholders.password')}
          />
          <CustomPasswordInput
            required
            fieldName='confirm_password'
            label={tCommon('labels.confirmPassword')}
            placeholder={tCommon('placeholders.confirmPassword')}
          />
        </AuthFormLayout>
      </form>
    </Form>
  );
}
