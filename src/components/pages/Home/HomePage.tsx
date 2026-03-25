import HeroSectionPreview from './sections/Hero/HeroSection';

import { HomePageSections } from '@/types/page';

export default function HomePage({ hero }: HomePageSections) {
  return (
    <div className='w-full bg-grayish-30'>
      <div className='container flex w-full flex-col'>
        <div className='mb-20 mt-6 md:mb-[7.5rem] md:mt-10 xl:my-[8.5rem]'>
          <HeroSectionPreview {...hero} />
        </div>
      </div>
    </div>
  );
}
