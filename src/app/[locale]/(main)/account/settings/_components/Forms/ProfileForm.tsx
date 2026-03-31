'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import FormServerError from '@/components/shared/FormServerError';
import LoadingError from '@/components/shared/LoadingError';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import EditableField from '../EditableField';
import ProfileImgInput from '../ProfileImgInput';

import ChangeEmailForm from './ChangeEmail/ChangeEmailForm';
import ChangePhoneForm from './ChangePhone/ChangePhoneForm';
import ChangePasswordForm from './ChangePasswordForm';
import { profileFormQueryKey, profileFormSchema } from './schemas';

import { GetUserProfileRes, ProfileFormData } from '@/types/settings';

import { getProfileData, updateUserProfile } from '@/api/settings';
import { zodResolver } from '@hookform/resolvers/zod';

type ProfileFormProps = {
  accessToken: string | undefined;
};

export default function ProfileForm({ accessToken }: ProfileFormProps) {
  const tCommon = useTranslations('common');
  const tRoot = useTranslations('');

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<ReturnType<typeof profileFormSchema>>>({
    resolver: zodResolver(profileFormSchema(tRoot)),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      file: null,
      password: '********',
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const { isFetching, isFetched, data, isLoading, isError } =
    useQuery<GetUserProfileRes>({
      queryKey: [profileFormQueryKey],
      queryFn: () => getProfileData(accessToken),
    });

  const userData = data?.result;

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: ProfileFormData) =>
      updateUserProfile(values, accessToken),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [profileFormQueryKey] });
      toast.success(tCommon('toaster.dataUpdatedSuccess'));
      form.reset({ ...variables, file: null });
    },
    onError: (error: Error) => {
      console.log(error);
      setServerError(error.message);
    },
  });

  useEffect(() => {
    if (isLoading) return;
    form.reset({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      file: null,
    });
  }, [form, isFetched, userData, isLoading]);

  const isFormValid = form.formState.isValid;
  const isFormDirty = form.formState.isDirty;

  if (isError) return <LoadingError />;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(async (values) => {
          await mutateAsync(values);
        })}
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-6 sm:gap-8 md:gap-12'>
          <ProfileImgInput
            isLoading={isFetching || isPending}
            image={userData?.profilePicture}
            className='w-fit max-sm:mx-auto'
          />

          <div className='flex w-full flex-wrap gap-6'>
            <CustomInput
              formItemClassName='flex-1 max-sm:min-w-full'
              disabled={isPending || isFetching}
              required
              fieldName='firstName'
              label={tCommon('labels.firstName')}
              placeholder={
                isFetching
                  ? tCommon('loading')
                  : tCommon('placeholders.firstName')
              }
            />
            <CustomInput
              formItemClassName='flex-1 max-sm:min-w-full'
              disabled={isPending || isFetching}
              required
              fieldName='lastName'
              label={tCommon('labels.lastName')}
              placeholder={
                isFetching
                  ? tCommon('loading')
                  : tCommon('placeholders.lastName')
              }
            />
          </div>
        </div>
        <EditableField
          formTitle={tRoot('settings.titles.changeEmail')}
          editForm={<ChangeEmailForm />}
          fieldName='email'
          label={tCommon('labels.email')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.email')
          }
        />
        <EditableField
          formTitle={tRoot('settings.titles.changePhone')}
          editForm={<ChangePhoneForm />}
          fieldName='phoneNumber'
          label={tCommon('labels.phone')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.phone')
          }
        />
        <EditableField
          formTitle={tRoot('settings.titles.changePassword')}
          editForm={<ChangePasswordForm />}
          fieldName='password'
          label={tCommon('labels.password')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.password')
          }
        />

        {serverError && <FormServerError>{serverError}</FormServerError>}

        <Button
          disabled={!isFormValid || !isFormDirty || isPending}
          className='mt-4 w-[11.5rem] self-end max-sm:w-full md:mt-8'
        >
          {tCommon('buttons.save')}
        </Button>
      </form>
    </Form>
  );
}
