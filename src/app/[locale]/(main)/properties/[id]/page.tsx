import { MapPin } from 'lucide-react';

import AddDatesForPrices from './_components/AddDatesForPrices';
import AddToWishlistBtn from './_components/AddToWishlistBtn';
import AmenitiesList from './_components/AmenitiesList';
import PropertyImages from './_components/PropertyImages';
import ReservationForm from './_components/ReservationForm';
import SectionTitle from './_components/SectionTitle';
import ShareBtn from './_components/ShareBtn';

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const property = {
    id: '1',
    title: 'Property 1',
    subtitle: 'Subtitle 1',
    price: 100,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 10,
    coverImageUrl: 'https://placehold.co/600x400/red/orange',
    images: [
      'https://placehold.co/600x400/gray/orange',
      'https://placehold.co/600x400/black/orange',
      'https://placehold.co/600x400/blue/orange',
      'https://placehold.co/600x400/green/orange',
    ],
  };

  return (
    <div className='flex size-full flex-col bg-grayish-30'>
      <PropertyImages
        coverImage={property.coverImageUrl}
        images={property.images}
      />
      <div className='container mt-8 md:mt-12 lg:mt-16'>
        <div className='flex justify-between gap-4'>
          {/* Text sections */}
          <div className='flex flex-col pb-[6.1875rem] md:w-[32.44rem] xl:w-[46.625rem]'>
            <PropertyInfo />
            <span className='my-8 h-px w-full bg-grayish-50' />
            <AboutProperty />
            <span className='my-8 h-px w-full bg-grayish-50' />
            <AmenitiesList
              amenities={Array.from({ length: 20 }).map((_, index) => ({
                id: index.toString(),
              }))}
            />
          </div>
          {/* Booking section */}
          <AddDatesForPrices />
        </div>
      </div>
      <div className='max-h-fit sm:hidden'>
        <ReservationForm
          maxGuests={5}
          variant='mobile'
        />
      </div>
    </div>
  );
}

function PropertyInfo() {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <SectionTitle>Apartment in Bab El Louk, Egypt</SectionTitle>
        <div className='flex items-center gap-4 max-md:hidden'>
          <ShareBtn />
          <AddToWishlistBtn />
        </div>
      </div>
      <p className='mt-4 font-medium leading-5 text-grayish-900 md:text-xl xl:text-xl'>
        apartment in Zamalek, Egypt
      </p>
      <div className='mt-2 flex items-center gap-1 leading-5'>
        <span>4 Guests</span>.<span>3 Bedrooms</span>.<span>1 Bathrooms</span>
      </div>
      <div className='mt-2 flex items-center gap-1 text-grayish-400'>
        <MapPin className='size-5 text-grayish-400' />
        <span>Cairo, Egypt</span>
      </div>
    </div>
  );
}

function AboutProperty() {
  return (
    <div className='flex flex-col gap-4'>
      <SectionTitle>About this Place</SectionTitle>
      <p className='text-grayish-400'>
        A stylish, sun-lit apartment set in the vibrant heart of Bab El Louk.
        Surrounded by cafés, bookstores, and the cultural energy of downtown
        Cairo, this space blends modern comfort with the charm of an iconic
        neighbourhood. Perfect for relaxed stays, work trips, or weekends in the
        city — with everything you need just a short walk away.
      </p>
      <button
        type='button'
        className='w-fit px-4 py-2.5 text-grayish-900 underline'
      >
        see more
      </button>
    </div>
  );
}
