import { ContactUsPageSections } from '@/types/page';
import BannerSection from '../sections/BannerSection';

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
