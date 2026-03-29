import { useTranslations } from 'next-intl';

import ImageIcon from '@/components/icons/ImageIcon';

import { PartnersSectionRes } from '@/types/page';

export default function PartnersSection({
  title,
  description,
  items,
}: PartnersSectionRes) {
  const t = useTranslations('sections.partners');

  return (
    <section className='flex flex-col gap-16'>
      {/* Header Section */}
      <div className='flex flex-col gap-2'>
        <h3
          title={title}
          className='text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.5rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='text-grayish-400 md:text-lg'
        >
          {description}
        </p>
      </div>

      {/* Reviews Carousel */}
      <div className='flex gap-12 overflow-x-auto pb-4'>
        {items.map((review) => (
          <div
            key={review.id}
            className='min-w-[20.464rem] max-w-[20.464rem]'
          >
            {/* Guest Info */}
            <div className='mb-4 flex gap-2'>
              <div className='size-12 flex-shrink-0 overflow-hidden rounded-full bg-grayish-50'>
                {review.iconUrl ? (
                  <img
                    src={review.iconUrl}
                    alt={review.title}
                    className='size-full object-cover'
                  />
                ) : (
                  <div className='flex size-full items-center justify-center'>
                    <ImageIcon className='size-5' />
                  </div>
                )}
              </div>
              <div className='flex flex-1 flex-col gap-1'>
                <h3 className='font-medium text-grayish-900 md:text-lg'>
                  {review.title}
                </h3>
                <p className='text-grayish-400'>{t('luftPartner')}</p>
              </div>
            </div>

            {/* Review Text */}
            <p className='line-clamp-3 text-grayish-400'>{review.reviewText}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
