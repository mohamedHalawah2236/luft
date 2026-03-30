'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Star } from 'lucide-react';

import AirbnbIcon from '@/components/icons/AirbnbIcon';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Review {
  id: string;
  guestName: string;
  location: string;
  avatar: string;
  rating: number;
  daysAgo: number;
  stayedDays: number;
  text: string;
}

function StarRating({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'md';
}) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div className='flex gap-2'>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} stroke-black ${
            i < Math.floor(rating)
              ? 'fill-grayish-900 text-grayish-900'
              : i < rating
                ? 'fill-grayish-900 text-grayish-900'
                : 'text-transpafill-transparent fill-transparent'
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations('sections.testimonials');

  const reviews: Review[] = [
    {
      id: '1',
      guestName: 'Mikasa Aramin',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa1',
      rating: 4,
      daysAgo: 5,
      stayedDays: 6,
      text: t('dummyReviewText'),
    },
    {
      id: '2',
      guestName: 'Mikasa Aramin',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa2',
      rating: 4,
      daysAgo: 5,
      stayedDays: 6,
      text: t('dummyReviewText'),
    },
    {
      id: '3',
      guestName: 'Mikasa Aramin',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa3',
      rating: 4,
      daysAgo: 5,
      stayedDays: 6,
      text: t('dummyReviewText'),
    },
    {
      id: '4',
      guestName: 'Mikasa Aramin',
      location: t('dummyReviewLocation'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa4',
      rating: 4,
      daysAgo: 5,
      stayedDays: 6,
      text: t('dummyReviewText'),
    },
  ];

  return (
    <section className='w-full'>
      {/* Header Section */}
      <div className='mb-8 flex flex-col items-start justify-between gap-2 md:mb-12 md:flex-row md:items-end md:gap-6 lg:mb-16'>
        <div className='flex-1'>
          <h2 className='mb-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] lg:text-5xl lg:leading-[3.625rem]'>
            {t('title')}
          </h2>
          <p className='text-grayish-400 lg:text-lg'>{t('subtitle')}</p>
        </div>

        {/* Rating Badge */}
        <div className='flex flex-col items-center gap-1 max-sm:items-start md:items-end'>
          <div className='flex items-baseline gap-2'>
            <span className='text-5xl font-medium leading-[3.625rem] md:text-6xl md:leading-[4.5rem] lg:text-7xl lg:leading-[5.375rem]'>
              4.8
            </span>
          </div>
          <div className='flex items-center gap-4 max-sm:flex-col max-sm:items-start'>
            <StarRating
              rating={4.5}
              size='md'
            />
            <span className='text-grayish-400'>
              {t('ratedBy', { count: '1,000' })}
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <Carousel className='flex w-full items-center gap-1 pb-4 [&>.overflow-hidden]:flex-1'>
        <CarouselPrevious className='static translate-x-0 translate-y-0' />

        <CarouselContent className='-ms-12 flex-1'>
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className='min-w-[20.464rem] max-w-[20.464rem] ps-12'
            >
              {/* Guest Info */}
              <div className='mb-4 flex gap-2'>
                <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100'>
                  <Image
                    src={review.avatar}
                    alt={review.guestName}
                    width={48}
                    height={48}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg text-grayish-900'>
                    {review.guestName}
                  </h3>
                  <p className='text-grayish-400'>{review.location}</p>
                </div>
              </div>

              {/* Rating and Metadata */}
              <div className='mb-4 flex items-center gap-2 text-grayish-900'>
                <StarRating
                  rating={review.rating}
                  size='sm'
                />
                <span className=''>•</span>
                <span className=''>
                  {t('daysAgo', { days: review.daysAgo })}
                </span>
                <span className='text-grayish-400'>•</span>
                <span className='text-grayish-400'>
                  {t('stayedDays', { days: review.stayedDays })}
                </span>
              </div>

              {/* Review Text */}
              <p className='mb-1 line-clamp-3 text-grayish-400'>
                {review.text}
              </p>

              {/* See More Link */}
              <span className='mb-4 text-grayish-900 underline'>
                {t('seeMore')}
              </span>

              {/* Airbnb Attribution */}
              <div className='flex items-center gap-2 pt-3'>
                <span className='text-grayish-900'>{t('ratedOn')}</span>
                <AirbnbIcon />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='static translate-x-0 translate-y-0' />
      </Carousel>
    </section>
  );
}
