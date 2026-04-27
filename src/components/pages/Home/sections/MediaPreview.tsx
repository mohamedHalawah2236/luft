'use client';
import { useEffect, useState } from 'react';

import ImagePlaceholder from '@/components/sections/ImagePlaceholder';
import { Skeleton } from '@/components/ui/skeleton';

import { ALLOWED_IMGS_TYPES, ALLOWED_VIDS_TYPES } from '@/constants/media';

import { cn } from '@/lib/utils';

type MediaPreviewProps = {
  url: string | null;
  className?: string;
  iconClassName?: string;
};

export default function MediaPreview({
  url,
  className,
  iconClassName,
}: MediaPreviewProps) {
  // Strip query strings and hash fragments before extracting the extension
  const rawExt = url
    ? new URL(url, 'http://x').pathname.split('.').pop()
    : undefined;
  const extension = rawExt ? `.${rawExt}` : '';

  const isImageMedia = ALLOWED_IMGS_TYPES.includes(extension || '');
  const isVideoMedia = ALLOWED_VIDS_TYPES.includes(extension || '');

  const isNotSupportedMedia = !isImageMedia && !isVideoMedia;

  const [mediaHasError, setMediaHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    if (url) {
      return isImageMedia || isVideoMedia;
    }
    return false;
  });

  useEffect(() => {
    setMediaHasError(false);
    setIsLoading(!!url && (isImageMedia || isVideoMedia));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div
      className={cn(
        'relative h-[19.8rem] w-[33.25rem] overflow-hidden rounded-2xl',
        {
          'flex items-center justify-center bg-grayish-100':
            !url || mediaHasError || isNotSupportedMedia,
        },
        className,
      )}
    >
      {url ? (
        mediaHasError ? (
          <ImagePlaceholder messageKey='cantLoadMedia' />
        ) : isImageMedia ? (
          <>
            {isLoading && (
              <Skeleton className='absolute inset-0 z-10 size-full' />
            )}
            <img
              key={url}
              src={url}
              alt={'Media'}
              decoding='async'
              className={cn('size-full object-cover', {
                'opacity-0': isLoading,
              })}
              ref={(img) => {
                // Handle cached images where onLoad never fires
                if (img?.complete) setIsLoading(false);
              }}
              onError={() => {
                setMediaHasError(true);
                setIsLoading(false);
              }}
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : isVideoMedia ? (
          <>
            {isLoading && (
              <Skeleton className='absolute inset-0 z-10 size-full' />
            )}
            <video
              key={url}
              controls
              src={url}
              className={cn('size-full object-cover', {
                'opacity-0': isLoading,
              })}
              onError={() => {
                setMediaHasError(true);
                setIsLoading(false);
              }}
              onLoadedData={() => setIsLoading(false)}
            />
          </>
        ) : (
          <ImagePlaceholder
            iconClassName={iconClassName}
            messageKey='mediaNotSupported'
          />
        )
      ) : (
        <ImagePlaceholder messageKey='noMediaUploaded' />
      )}
    </div>
  );
}
