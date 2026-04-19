'use client';
import { useTranslations } from 'next-intl';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import PropertyCard from './PropertyCard';

export default function RecommendedProperties() {
  const t = useTranslations('sections.recommendedProperties');

  return (
    <div className='flex flex-col items-center gap-6 md:gap-8 lg:gap-12'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h3 className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-[2.75rem] xl:text-5xl xl:leading-[3.625rem]'>
          {t('title')}
        </h3>
        <p className='text-grayish-400 md:text-lg'>{t('subtitle')}</p>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: true,
            stopOnLastSnap: true,
          }),
        ]}
        className='flex w-full items-center gap-2 [&>.overflow-hidden]:flex-1'
      >
        <CarouselPrevious className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent !bg-transparent p-0 hover:bg-grayish-30 max-sm:hidden' />

        <CarouselContent className='-ms-4 flex-1 lg:-ms-6'>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className='ms-4 flex min-w-fit flex-col ps-0 lg:ms-6'
            >
              <PropertyCard
                id={index.toString()}
                image='https://fm-api.luft-dev.appsindexco.net//Uploads/Sections/a660e2c2-4668-4e9c-8e83-5c3b57a9f24e.jpg'
                title={t('card.title')}
                description={t('card.description')}
                rating={4.8}
                oldPrice={120}
                newPrice={100}
                numOfReviews={120}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent !bg-transparent p-0 hover:bg-grayish-30 max-sm:hidden' />
      </Carousel>
    </div>
  );
}
