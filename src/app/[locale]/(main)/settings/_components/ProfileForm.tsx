'use client';

import React, { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation, useQuery } from '@tanstack/react-query';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import ProfileImgInput from './ProfileImgInput';

import { GetUserProfileRes } from '@/types/settings';

import { getProfileData, updateUserProfile } from '@/api/settings';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProfileForm({
  accessToken,
}: {
  accessToken: string | undefined;
}) {
  const tCommon = useTranslations('common');

  const formSchema = z.object({
    firstName: z.string().min(1, 'required'),
    lastName: z.string().min(1, 'required'),
    email: z.string(),
    file: z.instanceof(File).nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      file: null,
    },
  });

  const { isFetching, isFetched, data } = useQuery<GetUserProfileRes>({
    queryKey: ['settings'],
    queryFn: () => getProfileData(accessToken),
  });

  const userData = data?.result;

  useEffect(() => {
    if (isFetched)
      form.reset({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
      });
  }, [form, isFetched, userData]);

  const { mutateAsync } = useMutation({
    mutationFn: updateUserProfile,
    onMutate: () => {},
    onSuccess: (data) => {},
    onError: (error: Error) => {},
  });

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
            isLoading={isFetching}
            image={userData?.profilePicture}
            className='w-fit max-sm:mx-auto'
          />

          <div className='flex w-full flex-wrap gap-6'>
            <CustomInput
              formItemClassName='flex-1 max-sm:min-w-[22.4rem]'
              disabled={isFetching}
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
              formItemClassName='flex-1 max-sm:min-w-[22.4rem]'
              disabled={isFetching}
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
        <CustomInput
          required
          fieldName='email'
          label={tCommon('labels.email')}
          type='email'
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.email')
          }
          disabled
        />
        <CustomInput
          required
          fieldName='phone'
          label={tCommon('labels.phone')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.phone')
          }
          disabled
        />
        <CustomPasswordInput
          required
          fieldName='password'
          label={tCommon('labels.password')}
          placeholder={
            isFetching ? tCommon('loading') : tCommon('placeholders.password')
          }
          disabled
        />

        <Button className='mt-4 w-[11.5rem] self-end max-sm:w-full md:mt-8'>
          {tCommon('buttons.save')}
        </Button>
      </form>
    </Form>
  );
}
