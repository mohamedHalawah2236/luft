import MediaHero from './CustomVideoPlay';
import { HomeSearch } from './HomeSearch';

import { HeroSectionRes } from '@/types/page';

export default function HeroSectionPreview({
  title,
  description,
  mediaUrl,
  mediaExtension,
}: HeroSectionRes) {
  return (
    <div className='flex h-full flex-col items-center gap-4 lg:flex-row lg:gap-6'>
      <div className='order-2 flex flex-col gap-6 md:gap-8 lg:order-1 lg:gap-12'>
        <div className='flex flex-1 flex-col'>
          {/* Texts */}
          <div className='flex flex-col gap-4'>
            <h3
              title={title}
              className='line-clamp-2 text-[2rem] font-medium leading-[2.5rem] text-grayish-900 md:text-5xl md:leading-[3.5rem] lg:text-6xl lg:leading-[4.52rem]'
            >
              {title}
            </h3>
            <p
              title={description}
              className='line-clamp-4 text-grayish-400 md:text-lg'
            >
              {description}
            </p>
          </div>
          {/* Search */}
          <div className='flex flex-col gap-6'></div>
        </div>
        <HomeSearch />
      </div>

      {/* media */}
      <MediaHero
        src={mediaUrl}
        extension={mediaExtension}
        className='h-[14rem] w-full rounded-[2.5rem] md:h-[27.875rem] lg:order-2 lg:w-[39.625rem] lg:min-w-[39.625rem]'
      />
    </div>
  );
}
