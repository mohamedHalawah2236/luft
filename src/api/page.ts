import { Locale } from '@/i18n/i18n.config';
import { getAllData } from '@/utils/api';

export const getLayoutData = (locale: Locale) =>
  getAllData('api/CMS/get-pages-public', {
    headers: {
      language: locale,
    },
  });
