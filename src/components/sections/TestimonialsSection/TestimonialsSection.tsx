'use client';

import Image from 'next/image';

import { Star } from 'lucide-react';

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
    <div className='flex gap-1'>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? 'fill-black text-black'
              : i < rating
                ? 'fill-black text-black'
                : 'fill-gray-300 text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className='w-full bg-white px-6 py-16 md:px-12 lg:px-16'>
      {/* Header Section */}
      <div className='mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end'>
        <div>
          <h2 className='mb-4 text-4xl font-bold md:text-5xl'>
            What Our Guests Say
          </h2>
          <p className='text-lg text-gray-600'>
            Loved for comfort, cleanliness, and our personalized concierge care
          </p>
        </div>

        {/* Rating Badge */}
        <div className='flex flex-col items-center gap-3 md:items-end'>
          <div className='flex items-baseline gap-2'>
            <span className='text-6xl font-bold'>4.8</span>
          </div>
          <div className='flex items-center gap-3'>
            <StarRating
              rating={4.5}
              size='md'
            />
            <span className='text-sm text-gray-600'>
              rated by 1,000+ Guests on airbnb
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div className='scrollbar-hide flex gap-6 overflow-x-auto pb-4'>
        {reviews.map((review) => (
          <div
            key={review.id}
            className='w-full flex-shrink-0 rounded-lg border border-gray-200 bg-white p-6 md:w-96'
          >
            {/* Guest Info */}
            <div className='mb-4 flex items-center gap-3'>
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
                <h3 className='font-semibold text-gray-900'>
                  {review.guestName}
                </h3>
                <p className='text-sm text-gray-600'>{review.location}</p>
              </div>
            </div>

            {/* Rating and Metadata */}
            <div className='mb-3 flex items-center gap-2'>
              <StarRating
                rating={review.rating}
                size='sm'
              />
              <span className='text-sm text-gray-600'>•</span>
              <span className='text-sm text-gray-600'>
                {review.daysAgo} days ago
              </span>
              <span className='text-sm text-gray-600'>•</span>
              <span className='text-sm text-gray-600'>
                Stayed {review.stayedDays} days
              </span>
            </div>

            {/* Review Text */}
            <p className='mb-3 text-sm leading-relaxed text-gray-700'>
              {review.text}
            </p>

            {/* See More Link */}
            <a
              href='#'
              className='inline-text-sm mb-4 font-semibold text-gray-900 underline'
            >
              See more
            </a>

            {/* Airbnb Attribution */}
            <div className='flex items-center gap-2 border-t border-gray-200 pt-3'>
              <span className='text-xs text-gray-600'>Rated on</span>
              <svg
                width='60'
                height='20'
                viewBox='0 0 60 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-5'
              >
                <path
                  d='M10 0C5.6 0 2 3.6 2 8c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z'
                  fill='currentColor'
                  className='text-red-500'
                />
                <text
                  x='15'
                  y='14'
                  fontSize='10'
                  fontWeight='bold'
                  fill='currentColor'
                >
                  airbnb
                </text>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className='mt-8 flex justify-center gap-2'>
        <div className='h-2 w-6 rounded-full bg-gray-900'></div>
        <div className='h-2 w-12 rounded-full bg-gray-300'></div>
      </div>
    </section>
  );
}
