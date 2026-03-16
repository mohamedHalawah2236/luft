import BannerSection from './sections/BannerSection';

export default function AboutPage() {
  return (
    <div className='flex w-full flex-col'>
      <BannerSection
        title='About Luft'
        description='Making your stay feel like home'
        mediaUrl='https://placehold.net/3-600x800.png'
        className='h-[21.25rem] sm:h-[25rem]'
      />
    </div>
  );
}
