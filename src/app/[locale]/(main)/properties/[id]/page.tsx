import AboutProperty from './_components/AboutProperty';
import AddDatesForPrices from './_components/AddDatesForPrices';
import AmenitiesList from './_components/AmenitiesList';
import NearbyPlaces from './_components/NearbyPlaces';
import PropertyImages from './_components/PropertyImages';
import PropertyInfo from './_components/PropertyInfo';
import PropertyLocation from './_components/PropertyLocation';
import ReservationForm from './_components/ReservationForm';
import ReviewsSection from './_components/Reviews/ReviewsSection';

import { getProperty } from '@/api/properties';

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const { result: property } = await getProperty(id);
  const coverImage = property.images.find((img) => img.isCover);
  const {
    title,
    subtitle,
    maximumGuests,
    numberOfRooms,
    numberOfBathrooms,
    city,
    area,
    amenities,
    description,
    pricePerNight,
    latitude,
    longitude,
    nearbyPlaces,
    reviews,
  } = property;

  return (
    <div className='flex size-full flex-col bg-grayish-30 sm:pb-16 lg:pb-44'>
      <PropertyImages
        coverImage={coverImage?.url ?? ''}
        images={property.images.map((img) => img.url)}
      />
      <div className='container mt-8 md:mt-12 lg:mt-16'>
        <div className='flex justify-between gap-4'>
          {/* Text sections */}
          <div className='flex flex-col md:w-[32.44rem] xl:w-[46.625rem]'>
            <PropertyInfo
              title={title}
              subtitle={subtitle}
              maximumGuests={maximumGuests}
              numberOfRooms={numberOfRooms}
              numberOfBathrooms={numberOfBathrooms}
              city={city}
              area={area}
            />
            <span className='my-4 h-px w-full bg-grayish-50 md:my-6 lg:my-8' />
            <AboutProperty
              description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            sunt eum iste, similique, quidem rem quis perspiciatis aspernatur
            suscipit, ipsum doloribus minus fuga possimus porro assumenda magnam
            asperiores dolorem odio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            sunt eum iste, similique, quidem rem quis perspiciatis aspernatur
            suscipit, ipsum doloribus minus fuga possimus porro assumenda magnam
            asperiores dolorem odio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            sunt eum iste, similique, quidem rem quis perspiciatis aspernatur
            suscipit, ipsum doloribus minus fuga possimus porro assumenda magnam
            asperiores dolorem odio.`}
            />
            <span className='my-4 h-px w-full bg-grayish-50 md:my-6 lg:my-8' />
            {amenities.length > 0 && <AmenitiesList amenities={amenities} />}
          </div>
          {/* Booking section */}
          <AddDatesForPrices
            maxGuests={maximumGuests}
            pricePerNight={pricePerNight}
          />
        </div>
        {reviews.length > 0 && (
          <div className='my-8 md:my-12 lg:my-16'>
            <ReviewsSection reviews={reviews} />
          </div>
        )}
        <div className='mb-6 md:mb-8 lg:mb-12'>
          <PropertyLocation
            lat={latitude}
            lng={longitude}
          />
        </div>
        <div className='max-sm:mb-14'>
          <NearbyPlaces nearbyPlaces={nearbyPlaces} />
        </div>
      </div>
      <div className='max-h-fit sm:hidden'>
        <ReservationForm
          maxGuests={maximumGuests}
          variant='mobile'
        />
      </div>
    </div>
  );
}
