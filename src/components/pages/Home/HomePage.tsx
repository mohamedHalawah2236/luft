import ConciergeSectionPreview from '@/components/sections/ConciergeSection/ConciergeSection';
import PromiseSectionPreview from '@/components/sections/PromiseSection/PromiseSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection/TestimonialsSection';

import HeroSectionPreview from './sections/Hero/HeroSection';

import { HomePageSections } from '@/types/page';

export default function HomePage({
  hero,
  concierge,
  promise,
}: HomePageSections) {
  return (
    <div className='w-full bg-grayish-30'>
      <div className='container flex w-full flex-col'>
        <div className='mb-20 mt-6 md:mb-[7.5rem] md:mt-10 xl:my-[8.5rem]'>
          <HeroSectionPreview {...hero} />
        </div>
      </div>
      <div className='my-20 bg-grayish-50 py-6 md:my-[7.5rem] md:py-12 xl:my-[8.75rem] xl:py-20'>
        <div className='container'>
          <ConciergeSectionPreview {...concierge} />
        </div>
      </div>
      <div className='container my-20 md:my-[7.5rem] xl:my-[8.75rem]'>
        <PromiseSectionPreview {...promise} />
      </div>
      <div className='container my-20 bg-grayish-50 md:my-[7.5rem] xl:my-[8.75rem]'>
        <TestimonialsSection />
      </div>
    </div>
  );
}
