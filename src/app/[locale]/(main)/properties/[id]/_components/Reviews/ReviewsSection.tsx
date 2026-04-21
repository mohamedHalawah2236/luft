'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Autoplay from 'embla-carousel-autoplay';

import StarRating from '@/components/icons/StarRating';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import ReviewCard from './ReviewCard';

import { PropertyReview } from '@/types/properties';

export default function ReviewsSection() {
  const t = useTranslations('sections.testimonials');
  const [isExpanded, setIsExpanded] = useState(false);

  const reviews: PropertyReview[] = [
    {
      id: '1',
      name: 'Mikasa Aramin',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa1',
      rating: 4,
      daysAgo: 5,
      lengthOfStay: 6,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '2',
      name: 'Eren Yeager',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eren',
      rating: 5,
      daysAgo: 12,
      lengthOfStay: 4,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '3',
      name: 'Armin Arlert',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Armin',
      rating: 5,
      daysAgo: 8,
      lengthOfStay: 7,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '4',
      name: 'Levi Ackerman',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Levi',
      rating: 5,
      daysAgo: 2,
      lengthOfStay: 14,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '5',
      name: 'Hange Zoe',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hange',
      rating: 4,
      daysAgo: 20,
      lengthOfStay: 3,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '6',
      name: 'Erwin Smith',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erwin',
      rating: 5,
      daysAgo: 45,
      lengthOfStay: 5,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '7',
      name: 'Jean Kirstein',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
      rating: 4,
      daysAgo: 15,
      lengthOfStay: 2,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '8',
      name: 'Sasha Blouse',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha',
      rating: 5,
      daysAgo: 6,
      lengthOfStay: 8,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '9',
      name: 'Connie Springer',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Connie',
      rating: 4,
      daysAgo: 30,
      lengthOfStay: 4,
      reviewText: t('dummyReviewText'),
    },
    {
      id: '10',
      name: 'Historia Reiss',
      city: t('dummyReviewLocation'),
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Historia',
      rating: 5,
      daysAgo: 50,
      lengthOfStay: 10,
      reviewText: t('dummyReviewText'),
    },
  ];

  const maxCollapsedReviews = 4;
  const reviewsCount = reviews.length;

  return (
    <section className='w-full'>
      {/* Header Section */}
      <div className='mb-12 flex flex-col items-start justify-between gap-2 md:mb-12 md:flex-row md:items-end md:gap-6 lg:mb-16'>
        <div className='flex-1'>
          <h2 className='mb-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] lg:text-5xl lg:leading-[3.625rem]'>
            {t('title')}
          </h2>
          <p className='text-grayish-400 lg:text-lg'>{t('subtitle')}</p>
        </div>

        {/* Rating Badge */}
        <div className='flex flex-col gap-1 max-sm:items-start md:items-end'>
          <div className='flex items-baseline gap-2'>
            <span className='text-5xl font-medium leading-[3.625rem] md:text-6xl md:leading-[4.5rem] lg:text-7xl lg:leading-[5.375rem]'>
              4.8
            </span>
          </div>
          <div className='flex items-center gap-4 max-md:flex-col max-md:items-start'>
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

      <div className='flex flex-col max-sm:hidden'>
        <div className='grid grid-cols-2 gap-x-10 gap-y-12'>
          {Array.from({
            length: isExpanded ? reviewsCount : maxCollapsedReviews,
          }).map((_, index) => (
            <ReviewCard
              key={reviews[index].id}
              review={reviews[index]}
            />
          ))}
        </div>
        {/* Reviews Carousel */}
        <button
          type='button'
          className='mx-4 my-2.5 mt-8 w-fit text-grayish-900 underline lg:mt-12'
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'show less' : 'show all reviews'}
        </button>
      </div>

      {/* Reviews Carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: true,
            stopOnLastSnap: true,
          }),
        ]}
        className='flex w-full items-center gap-2 pb-4 sm:hidden [&>.overflow-hidden]:flex-1'
      >
        <CarouselPrevious className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent p-0 hover:bg-grayish-30 max-sm:hidden' />

        <CarouselContent className='-ms-4 flex-1'>
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className='ms-4 min-w-fit ps-0'
            >
              <ReviewCard
                key={review.id}
                review={review}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='static !size-fit translate-x-0 translate-y-0 border-0 border-transparent p-0 hover:bg-grayish-30 max-sm:hidden' />
      </Carousel>
    </section>
  );
}
