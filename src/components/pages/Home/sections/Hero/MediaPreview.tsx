'use client';
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import ImagePlaceholder from '@/components/sections/ImagePlaceholder';

import { ALLOWED_IMGS_TYPES, ALLOWED_VIDS_TYPES } from '@/constants/media';

import { cn } from '@/lib/utils';

type MediaPreviewProps = {
  url: string;
  extension: string;
  className?: string;
};

export default function MediaPreview({
  url,
  extension,
  className,
}: MediaPreviewProps) {
  const t = useTranslations('common');

  const [mediaHasError, setMediaHasError] = useState(false);

  const isImageMedia = ALLOWED_IMGS_TYPES.includes(extension);
  const isVideoMedia = ALLOWED_VIDS_TYPES.includes(extension);

  const isNotSupportedMedia = !isImageMedia && !isVideoMedia;

  return (
    <div
      className={cn(
        'h-[19.8rem] w-[33.25rem] overflow-hidden rounded-2xl',
        {
          'flex items-center justify-center bg-neutral-50':
            !url || mediaHasError || isNotSupportedMedia,
        },
        className,
      )}
    >
      {url ? (
        isImageMedia ? (
          <img
            src={url}
            alt={'Media'}
            className='size-full object-cover'
            onError={() => setMediaHasError(true)}
          />
        ) : isVideoMedia ? (
          <video
            controls
            src={url}
            className='size-full object-cover'
            onError={() => setMediaHasError(true)}
          />
        ) : (
          <ImagePlaceholder label={t('mediaNotSupported')} />
        )
      ) : (
        <ImagePlaceholder />
      )}
    </div>
  );
}
