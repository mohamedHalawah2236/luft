import { MapPin } from 'lucide-react';

import AddToWishlistBtn from './AddToWishlistBtn';
import SectionTitle from './SectionTitle';
import ShareBtn from './ShareBtn';

type PropertyInfoProps = {
  title: string;
  subtitle: string;
  maximumGuests: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  city: string;
  area: string;
};

function PropertyInfo({
  title,
  subtitle,
  maximumGuests,
  numberOfRooms,
  numberOfBathrooms,
  city,
  area,
}: PropertyInfoProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <SectionTitle>{title}</SectionTitle>
        <div className='flex items-center gap-4 max-md:hidden'>
          <ShareBtn />
          <AddToWishlistBtn />
        </div>
      </div>
      <p className='mt-4 font-medium leading-5 text-grayish-900 md:text-xl xl:text-xl'>
        {subtitle}
      </p>
      <div className='mt-2 flex items-center gap-1 leading-5'>
        <span>{maximumGuests} Guests</span>.
        <span>{numberOfRooms} Bedrooms</span>.
        <span>{numberOfBathrooms} Bathrooms</span>
      </div>
      <div className='mt-2 flex items-center gap-1 text-grayish-400'>
        <MapPin className='size-5 text-grayish-400' />
        <span>
          {city}, {area}
        </span>
      </div>
    </div>
  );
}

export default PropertyInfo;
