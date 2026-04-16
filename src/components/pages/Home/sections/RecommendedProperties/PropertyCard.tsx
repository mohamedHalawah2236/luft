import { useTranslations } from 'next-intl';

import { Star } from 'lucide-react';

import { Link } from '@/i18n/routing';

type PropertyCardProps = {
  image: string;
  title: string;
  description: string;
  rating: number;
  oldPrice: number;
  newPrice: number;
  numOfReviews: number;
  id: string;
};

export default function PropertyCard({
  image,
  title,
  description,
  rating,
  oldPrice,
  newPrice,
  numOfReviews,
  id,
}: PropertyCardProps) {
  const t = useTranslations('common');

  return (
    <Link
      href={`/property/${id}`}
      className='flex w-[13rem] select-none flex-col gap-4 overflow-hidden transition-all duration-300 hover:scale-[0.97] md:w-[22.375rem] lg:w-[26rem]'
    >
      <img
        src={image}
        alt={title}
        className='h-[12.875rem] w-full rounded-3xl object-cover md:h-[25rem]'
      />
      <div className='flex w-full flex-col gap-2'>
        <h5 className='line-clamp-2 font-medium leading-5 text-grayish-900 md:text-lg lg:text-xl'>
          {title}
        </h5>
        <p
          title={description}
          className='line-clamp-1 leading-5 text-grayish-400'
        >
          {description}
        </p>
        {/* price and rating */}
        <div className='flex flex-wrap items-center gap-1 text-grayish-400'>
          <div className='flex items-center gap-1 font-medium leading-5 text-grayish-400 md:text-lg lg:text-xl'>
            <span className='line-through'>${oldPrice}</span>
            <span className='text-grayish-900'>${newPrice}</span>
            <span className='text-base font-normal leading-5'>
              {t('night')}
            </span>
          </div>
          <span>,</span>
          <div className='flex items-center text-lg leading-5'>
            <Star className='size-5 fill-grayish-400' /> &nbsp; {rating} &nbsp;
            <span className='leading-5'>({numOfReviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
