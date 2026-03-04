import { sendOtp } from '@/api/settings';
import CustomInput from '@/components/shared/form/CustomInput';
import { Form } from '@/components/ui/form';
import { EGYPTIAN_PHONE } from '@/constants/regex';
import { handleOnlyNumbersKeyDown } from '@/lib/utils';
import { SetState } from '@/types';
import { IDENTIFIER_TYPE, OTP_PURPOSE, SendOtpData } from '@/types/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
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

  const formSchema = z.object({
    phone: z
      .string({ required_error: tCommon('validations.required') })
      .min(1, { message: tCommon('validations.required') })
      .regex(EGYPTIAN_PHONE, tCommon('validations.phone.invalid')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
    reValidateMode: 'onChange',
    mode: 'onTouched',
  });

  const session = useSession();
  const accessToken = session.data?.accessToken;

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (values: SendOtpData) => sendOtp(values, accessToken),
    onMutate: () => {
      setServerError(undefined);
    },
    onSuccess: () => {
      setIsOtpSent(true);
      setIdentifier(form.getValues('phone'));
    },
    onError: (error: Error) => {
      setServerError(error.message);
    },
  });

  const onFormSubmit = form.handleSubmit(async ({ phone }) => {
    await mutateAsync({
      identifier: phone,
      type: IDENTIFIER_TYPE.Phone,
      otpPurpose: OTP_PURPOSE.UpdatePhone,
    });
  });

  return (
    <Form {...form}>
      <FieldFormLayout
        submitBtnLabel={tCommon('buttons.continue')}
        serverError={serverError}
        onSubmit={onFormSubmit}
      >
        <CustomInput
          required
          fieldName='phone'
          label={tCommon('labels.newPhone')}
          placeholder={'EX. 010XXXXXXXX'}
          onKeyDown={handleOnlyNumbersKeyDown}
        />
      </FieldFormLayout>
    </Form>
  );
}
