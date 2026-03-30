import MediaPreview from '@/components/pages/Home/sections/MediaPreview';

import BulletCard from './BulletCard';

import { MediaPositionEnum, PromiseSectionRes } from '@/types/page';

import { cn } from '@/lib/utils';

export default function PromiseSectionPreview({
  title,
  description,
  items,
  mediaUrl,
  mediaExtension,
  mediaPosition,
}: PromiseSectionRes) {
  return (
    <div className='flex flex-col gap-6 md:gap-8 lg:gap-12'>
      {/* Texts */}
      <div className='flex flex-col items-center gap-2 text-center'>
        <h3 className='line-clamp-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-[2.625rem] lg:text-5xl lg:leading-[3.625rem]'>
          {title}
        </h3>
        <p className='line-clamp-4 text-grayish-400 md:text-lg'>
          {description}
        </p>
      </div>

      <div className='flex justify-between gap-4 max-lg:flex-col lg:items-center lg:gap-6'>
        {/* media */}
        {mediaPosition === MediaPositionEnum.START && (
          <MediaPreview
            url={mediaUrl}
            extension={mediaExtension}
            className={cn(
              'h-[37.5rem] w-full max-sm:h-[14rem] lg:w-[46.75rem]',
            )}
          />
        )}

        {/* Bullets */}
        <div className='flex flex-1 flex-col gap-12 max-lg:order-2'>
          {items?.map((bullet, i) => (
            <BulletCard
              data={bullet}
              key={`bulletItem-${i}`}
            />
          ))}
        </div>

        {/* media */}
        {mediaPosition === MediaPositionEnum.END && (
          <MediaPreview
            url={mediaUrl}
            extension={mediaExtension}
            className={cn(
              'h-[37.5rem] w-full max-lg:order-1 max-sm:h-[14rem] lg:w-[46.75rem]',
            )}
          />
        )}
      </div>
    </div>
  );
}
