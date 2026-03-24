import AboutPage from '@/components/pages/About/AboutPage';
import ContactUsPage from '@/components/pages/ContactUs/ContactUsPage';

import {
  AboutPageSections,
  ContactUsPageSections,
  PageApiResponse,
  PageTypeEnum,
} from '@/types/page';

import { getPageSections } from '@/api/page';
import { Locale } from '@/i18n/i18n.config';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const {
    result: { pageType, sections },
  }: PageApiResponse = await getPageSections({
    locale: locale as Locale,
    pageId: id,
  });

  switch (pageType) {
    case PageTypeEnum.AboutUs:
      return <AboutPage {...(sections as AboutPageSections)} />;
    case PageTypeEnum.ContactUs:
      return <ContactUsPage {...(sections as ContactUsPageSections)} />;
    default:
      return <></>;
  }
}
