import AboutPage from '@/components/pages/About/AboutPage';

import { PageApiResponse, PageTypeEnum, AboutPageSections, ContactUsPageSections } from '@/types/page';

import { getPageSections } from '@/api/page';
import ContactUsPage from '@/components/pages/ContactUsPage';
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
