'use client';

import Image from 'next/image';

import { Star } from 'lucide-react';

import AirbnbIcon from '@/components/icons/AirbnbIcon';

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

const reviews: Review[] = [
  {
    id: '1',
    guestName: 'Mikasa Aramin',
    location: 'El Zamalek - Top of the world',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa1',
    rating: 4,
    daysAgo: 5,
    stayedDays: 6,
    text: 'We enjoyed our stay. The apartment was comfortable, well appointed, and peaceful. Great neighborhood and centrally located. T...',
  },
  {
    id: '2',
    guestName: 'Mikasa Aramin',
    location: 'El Zamalek - Top of the world',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa2',
    rating: 4,
    daysAgo: 5,
    stayedDays: 6,
    text: 'We enjoyed our stay. The apartment was comfortable, well appointed, and peaceful. Great neighborhood and centrally located. T...',
  },
  {
    id: '3',
    guestName: 'Mikasa Aramin',
    location: 'El Zamalek - Top of the world',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa3',
    rating: 4,
    daysAgo: 5,
    stayedDays: 6,
    text: 'We enjoyed our stay. The apartment was comfortable, well appointed, and peaceful. Great neighborhood and centrally located. T...',
  },
  {
    id: '4',
    guestName: 'Mikasa Aramin',
    location: 'El Zamalek - Top of the world',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikasa4',
    rating: 4,
    daysAgo: 5,
    stayedDays: 6,
    text: 'We enjoyed our stay. The apartment was comfortable, well appointed, and peaceful. Great neighborhood and centrally located. T...',
  },
];

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
  return (
    <section className='w-full'>
      {/* Header Section */}
      <div className='mb-8 flex flex-col items-start justify-between gap-2 md:mb-12 md:flex-row md:items-end md:gap-6 lg:mb-16'>
        <div className='flex-1'>
          <h2 className='mb-2 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] lg:text-5xl lg:leading-[3.625rem]'>
            What Our Guests Say
          </h2>
          <p className='text-grayish-400 lg:text-lg'>
            Loved for comfort, cleanliness, and our personalized concierge care
          </p>
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
              rated by 1,000+ Guests on airbnb
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div className='flex gap-12 overflow-x-auto pb-4'>
        {reviews.map((review) => (
          <div
            key={review.id}
            className='min-w-[20.464rem]'
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
                <h3 className='text-lg text-grayish-900'>{review.guestName}</h3>
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
              <span className=''>{review.daysAgo} days ago</span>
              <span className='text-grayish-400'>•</span>
              <span className='text-grayish-400'>
                Stayed {review.stayedDays} days
              </span>
            </div>

            {/* Review Text */}
            <p className='mb-1 line-clamp-3 text-grayish-400'>{review.text}</p>

            {/* See More Link */}
            <span className='mb-4 text-grayish-900 underline'>See more</span>

            {/* Airbnb Attribution */}
            <div className='flex items-center gap-2 pt-3'>
              <span className='text-grayish-900'>Rated on</span>
              <AirbnbIcon />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
