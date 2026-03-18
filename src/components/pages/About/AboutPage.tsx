import AboutSection from '@/components/sections/AboutSection';
import OurValuesSection from '@/components/sections/OurValuesSection/OurValuesSection';
import PerfectStaySection from '@/components/sections/PerfectStaySection';

import BannerSection from '../../sections/BannerSection';

import { AboutPageSections } from '@/types/page';

export default function AboutPage({
  aboutUs,
  banner,
  ourValues,
  mediaContentSection,
  howItWorks,
  perfectStaySection,
}: AboutPageSections) {
  return (
    <div className='flex w-full flex-col'>
      <BannerSection {...banner} />
      <div className='container pb-10 pt-20'>
        <AboutSection {...aboutUs} />

        <div className='my-16 md:my-[7.5rem] xl:my-[8.75rem]'>
          <OurValuesSection {...ourValues} />
        </div>
      </div>
      <div className='bg-grayish-50 py-10'>
        <PerfectStaySection {...perfectStaySection} />
      </div>
    </div>
  );
}
