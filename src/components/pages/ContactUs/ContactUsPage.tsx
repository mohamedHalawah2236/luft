import BannerSection from '@/components/sections/BannerSection';

import SendMessageSection from './sections/SendMessageSection';

import { ContactUsPageSections } from '@/types/page';

export default function ContactUsPage({
  banner,
  contactInformationSection,
}: ContactUsPageSections) {
  return (
    <div className='flex w-full flex-col'>
      <BannerSection {...banner} />
      <div className='container mb-40 mt-20 flex'>
        <div className='w-full md:w-[22.375rem] lg:w-[46.625rem]'>
          <SendMessageSection />
        </div>
      </div>
    </div>
  );
}
