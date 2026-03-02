'use client';
import React from 'react';

import { EditIcon, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import UserImg from '@/components/shared/UserImg';
import { Skeleton } from '@/components/ui/skeleton';

import FileUploaderButton from './FileUploaderButton';

import { ProfileFormData } from '@/types/settings';

import { cn } from '@/lib/utils';

type ProfileImgInputProps = {
  image: string | undefined;
  className?: string;
  isLoading: boolean;
};

export default function ProfileImgInput({
  image,
  isLoading,
  className,
}: ProfileImgInputProps) {
  const { getValues, setValue } = useFormContext<ProfileFormData>();

  const file = getValues('file');
  const uploadedImgUrl = file ? URL.createObjectURL(file) : '';

  console.log(uploadedImgUrl);
  console.log(image);

  return (
    <div className={cn('relative', className)}>
      {isLoading ? (
        <Skeleton className='size-[7.5rem] rounded-full' />
      ) : image ? (
        <img
          src={uploadedImgUrl || image}
          className='size-[7.5rem] rounded-full border border-grayish-50 object-cover'
        />
      ) : (
        <UserImg className='flex size-[7.5rem] text-6xl' />
      )}
      <FileUploaderButton
        fieldName='file'
        onFileSelect={(file) => setValue('file', file)}
        className='mx-auto -mt-2.5'
        buttonText={image ? 'Edit' : 'Add'}
        buttonIcon={
          image ? (
            <EditIcon className='size-5 text-grayish-900' />
          ) : (
            <Plus className='size-5 text-grayish-900' />
          )
        }
      />
    </div>
  );
}
