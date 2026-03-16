import AboutSection from '@/components/sections/AboutSection';
import OurValuesSection from '@/components/sections/OurValuesSection/OurValuesSection';

import BannerSection from '../../components/sections/BannerSection';

export default function AboutPage() {
  return (
    <div className='flex w-full flex-col'>
      <BannerSection
        title='About Luft'
        description='Making your stay feel like home'
        mediaUrl='https://placehold.net/3-600x800.png'
        className='h-[21.25rem] sm:h-[25rem]'
      />
      <div className='container pb-10 pt-20'>
        <AboutSection
          title='About Luft'
          description='At Luft Stay, we believe that every stay should feel effortless, comfortable, and memorable. Our mission is simple: to provide fully serviced apartments that combine the freedom of home with the convenience and quality of a hotel.

Whether you’re traveling for business or leisure, we are here to make your experience seamless. From modern amenities to thoughtfully designed spaces, every detail is chosen to ensure you feel relaxed and cared for during your stay'
          mediaUrl='https://placehold.net/3-600x800.png'
        />

        <div className='my-[8.75rem]'>
          <OurValuesSection
            items={[
              {
                id: '0db5b013-3948-4cc5-bf24-d1b205b463fc',
                title: 'Trusted Bookings',
                description:
                  'Every property on our platform is carefully verified to ensure a safe, reliable, and hassle-free stay for all our guests. Your comfort and security are our top priority.',
              },
              {
                id: '29f18bdd-a41a-4933-b81f-8c4fb698e885',
                title: 'Seamless Experience',
                description: 'Seamless Experience',
              },
              {
                id: '81049c56-5440-4f35-b4d8-6c794aad090f',
                title: 'Wide Selection',
                description: 'Wide Selection',
              },
              {
                id: '9f3a1cde-7f20-4e69-b28a-2cd55d1988f3',
                title: 'Customer Satisfaction',
                description: 'Customer Satisfaction',
              },
            ]}
            title='Our Values'
          />
        </div>
      </div>
    </div>
  );
}
