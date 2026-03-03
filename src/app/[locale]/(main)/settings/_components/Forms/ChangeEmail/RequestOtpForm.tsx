import CustomInput from '@/components/shared/form/CustomInput';
import { Form } from '@/components/ui/form';
import { SetState } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FieldFormLayout from '../FieldFormLayout';

export default function RequestOtpForm({
  setIdentifier,
  setIsOtpSent,
}: {
  setIdentifier: SetState<string>;
  setIsOtpSent: SetState<boolean>;
}) {
  const [serverError, setServerError] = useState<string | undefined>();
  const tCommon = useTranslations('common');

  const numOfDigits = process.env.NEXT_PUBLIC_NUM_OF_OTP_DIGITS ?? 6;

  const formSchema = z.object({
    email: z
      .string({ required_error: tCommon('validations.email.required') })
      .min(1, { message: tCommon('validations.email.required') })
      .email({ message: tCommon('validations.email.invalid') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Send otp api
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async () => {},
    onMutate: () => {
      setServerError(undefined);
    },
    onSuccess: () => {
      setIsOtpSent(true);
    },
    onError: (error: Error) => {
      setServerError(error.message);
    },
  });

  const onFormSubmit = form.handleSubmit(async (values) => {});

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit}>
        <FieldFormLayout
          submitBtnLabel={tCommon('buttons.continue')}
          serverError={serverError}
        >
          <CustomInput
            required
            fieldName='email'
            label={tCommon('labels.email')}
            type='email'
            placeholder={tCommon('placeholders.email')}
          />
        </FieldFormLayout>
      </form>
    </Form>
  );
}
