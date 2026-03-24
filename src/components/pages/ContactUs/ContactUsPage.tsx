import BannerSection from '@/components/sections/BannerSection';

import { ContactUsPageSections } from '@/types/page';

export default function ContactUsPage({
  banner,
  contactInformationSection,
}: ContactUsPageSections) {
  return (
    <div className='flex w-full flex-col'>
      <BannerSection {...banner} />
    </div>
  );
}
