import AboutSection from '@/components/sections/AboutSection';
import OurValuesSection from '@/components/sections/OurValuesSection/OurValuesSection';

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

        <div className='my-[8.75rem]'>
          <OurValuesSection {...ourValues} />
        </div>
      </div>
    </div>
  );
}
