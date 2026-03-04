'use client';

import { useContext, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';

import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Form } from '@/components/ui/form';

import { PASSWORD_REGEX } from '@/constants';

import { changeUserPassword } from '@/api/settings';
import { EditableFieldContext } from '@/contexts/EditableFieldContext';
import { ChangePasswordFormData } from '@/types/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import FieldFormLayout from './FieldFormLayout';

export default function ChangePasswordForm() {
  const [serverError, setServerError] = useState<string | undefined>();

  const tCommon = useTranslations('common');

  const formSchema = z
    .object({
      currentPassword: z.string().min(1, tCommon('validations.required')),

      password: z.string().superRefine((password, ctx) => {
        if (password.length < 8 || password.length > 20) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.length'),
          });
        }

        if (!PASSWORD_REGEX.number.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.number'),
          });
        }

        if (!PASSWORD_REGEX.special.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.specialCharacter'),
          });
        }

        if (!PASSWORD_REGEX.uppercase.test(password)) {
          ctx.addIssue({
            code: 'custom',
            message: tCommon('validations.password.uppercase'),
          });
        }
      }),

      confirmPassword: z
        .string()
        .min(1, tCommon('validations.confirmPassword.required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tCommon('validations.confirmPassword.mismatch'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
    mode: 'onTouched',
  });

  const session = useSession();
  const { setIsOpen } = useContext(EditableFieldContext);

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (values: ChangePasswordFormData) =>
      changeUserPassword(values, session.data?.accessToken),
    onMutate: () => {
      setServerError(undefined);
    },

    onSuccess: () => {
      setIsOpen(false);
    },
    onError: (error: Error) => setServerError(error.message),
  });

  const onFormSubmit = form.handleSubmit(async (values) => {
    await mutateAsync({
      currentPassword: values.currentPassword,
      newPassword: values.password,
    });
  });

  return (
    <Form {...form}>
      <FieldFormLayout
        submitBtnLabel={tCommon('buttons.change')}
        serverError={serverError}
        onSubmit={onFormSubmit}
      >
        <CustomPasswordInput
          required
          fieldName='currentPassword'
          label={tCommon('labels.currentPassword')}
          placeholder={tCommon('placeholders.password')}
        />
        <CustomPasswordInput
          required
          fieldName='password'
          label={tCommon('labels.newPassword')}
          placeholder={tCommon('placeholders.newPassword')}
        />
        <CustomPasswordInput
          required
          fieldName='confirmPassword'
          label={tCommon('labels.confirmPassword')}
          placeholder={tCommon('placeholders.confirmPassword')}
        />
      </FieldFormLayout>
    </Form>
  );
}
