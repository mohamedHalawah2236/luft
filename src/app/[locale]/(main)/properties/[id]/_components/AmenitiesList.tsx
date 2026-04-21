'use client';
import { useState } from 'react';

import { Check } from 'lucide-react';

import { Amenity } from '@/types/properties';
import SectionTitle from './SectionTitle';

type AmenitiesListProps = {
  amenities: Amenity[];
};

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = window.screen.width <= 600;
  const maxAminities = isMobile ? 6 : 13;
  const hasMoreThanMax = amenities.length > maxAminities;

  return (
    <div className='flex flex-col gap-4 text-grayish-900'>
      <SectionTitle>What this place offers</SectionTitle>
      {/* aminities */}
      <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-3'>
        {/* Amenity Card */}
        {amenities.map(({ amenityId, amenityName, amenityTypeName }) => (
          <div
            key={amenityId}
            className='flex w-full animate-fade items-start gap-0.5 duration-300'
          >
            <Check className='mt-0.5 size-5 text-grayish-400' />
            <div className='flex flex-col gap-1'>
              <h6 className='font-medium leading-5'>{amenityName}</h6>
              <p className='text-sm text-grayish-400'>{amenityTypeName}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMoreThanMax && (
        <button
          type='button'
          className='mt-2 w-fit px-4 py-2.5 underline transition-all'
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Show less' : 'Show all amenities'}
        </button>
      )}
    </div>
  );
}
