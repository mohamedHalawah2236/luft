'use client';

import { useTranslations } from 'next-intl';

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
  const t = useTranslations('common.buttons');
  const { watch, setValue } = useFormContext<ProfileFormData>();

  const file = watch('file');
  const uploadedImgUrl = file ? URL.createObjectURL(file) : '';
  const previewImage = uploadedImgUrl || image;

  return (
    <div className={cn('relative', className)}>
      {isLoading ? (
        <Skeleton className='size-[7.5rem] rounded-full' />
      ) : previewImage ? (
        <img
          src={previewImage}
          className='size-[7.5rem] rounded-full border border-grayish-50 object-cover'
        />
      ) : (
        <UserImg className='flex size-[7.5rem] text-6xl' />
      )}
      <FileUploaderButton
        fieldName='file'
        disabled={isLoading}
        onFileSelect={(file) =>
          setValue('file', file, { shouldDirty: true, shouldValidate: true })
        }
        className='mx-auto -mt-2.5'
        buttonText={image ? t('edit') : t('add')}
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
