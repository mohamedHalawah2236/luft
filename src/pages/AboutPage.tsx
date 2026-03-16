import AboutSection from '@/components/sections/AboutSection';
import BannerSection from '../components/sections/BannerSection';

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
      </div>
    </div>
  );
}
