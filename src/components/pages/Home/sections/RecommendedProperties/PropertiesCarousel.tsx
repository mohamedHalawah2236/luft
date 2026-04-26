'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselScrollBar,
} from '@/components/ui/carousel';

import PropertyCard from './PropertyCard';

import { useCarouselScrollBar } from '@/hooks/useCarouselScrollbar';

import { PropertyApiRes } from '@/types/properties';

type PropertiesCarouselProps = {
  properties: PropertyApiRes[];
};
export default function PropertiesCarousel({
  properties,
}: PropertiesCarouselProps) {
  const t = useTranslations('sections.recommendedProperties');
  const [api, setApi] = useState<CarouselApi>();
  const { value, onChange, canScroll } = useCarouselScrollBar(api);

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: true,
            stopOnLastSnap: true,
          }),
        ]}
        className='flex w-full items-center gap-2 [&>.overflow-hidden]:flex-1'
      >
        <CarouselContent className='-ms-4 flex-1 lg:-ms-6'>
          {properties.map(
            ({
              id,
              title,
              subtitle,
              price,
              rating,
              reviewCount,
              coverImageUrl,
            }) => (
              <CarouselItem
                key={id}
                className='ms-4 flex min-w-fit flex-col ps-0 lg:ms-6'
              >
                <PropertyCard
                  id={id}
                  image={coverImageUrl}
                  title={title}
                  description={subtitle}
                  rating={rating}
                  newPrice={price}
                  numOfReviews={reviewCount}
                />
              </CarouselItem>
            ),
          )}
        </CarouselContent>
      </Carousel>
      {canScroll && (
        <CarouselScrollBar
          id='property'
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
}
