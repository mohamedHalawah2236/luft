import AboutPage from '@/components/pages/About/AboutPage';

import { PageApiResponse, PageTypeEnum } from '@/types/page';

import { getPageSections } from '@/api/page';
import { Locale } from '@/i18n/i18n.config';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const res: PageApiResponse = await getPageSections({
    locale: locale as Locale,
    pageId: id,
  });

  const {
    pageType,
    aboutUs,
    banner,
    ourValues,
    mediaContentSection,
    howItWorks,
    perfectStaySection,
  } = res.result;

  console.log(res);

  const sections = {
    aboutUs,
    banner,
    ourValues,
    mediaContentSection,
    howItWorks,
    perfectStaySection,
  };

  switch (pageType) {
    case PageTypeEnum.AboutUs:
      return <AboutPage {...sections} />;
    default:
      return <></>;
  }
}
