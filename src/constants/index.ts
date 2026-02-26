export const DEFAULT_IMAGE_URL = 'https://placehold.co/800?text=No+Image';

export const PAGES = [
  { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
  { labelEn: 'For Owners', labelAr: 'للملاك', href: '/owners' },
  { labelEn: 'About us', labelAr: 'معلومات عنا', href: '/about' },
  { labelEn: 'Contact Us', labelAr: 'تواصل معنا', href: '/contact' },
] as const;

export const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\s]+$/;

export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  number: /\d/,
  special: /[^A-Za-z0-9]/,
} as const;

import { getTranslations } from 'next-intl/server';

export type TFunction = Awaited<ReturnType<typeof getTranslations>>;
