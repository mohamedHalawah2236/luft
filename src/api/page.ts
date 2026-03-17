import { getAllData } from '@/utils/api';

import { Locale } from '@/i18n/i18n.config';

export const getLayoutData = (locale: Locale) =>
  getAllData('api/CMS/get-pages-public', {
    headers: {
      language: locale,
    },
  });

export const getPageSections = ({
  locale,
  pageId,
}: {
  locale: Locale;
  pageId: string;
}) =>
  getAllData(`api/CMS/get-all-cms?PageId=${pageId}`, {
    headers: {
      language: locale,
    },
  });
