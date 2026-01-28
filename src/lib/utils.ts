import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { PASSWORD_REGEX } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidPassword = (password: string) =>
  PASSWORD_REGEX.uppercase.test(password) &&
  PASSWORD_REGEX.number.test(password) &&
  PASSWORD_REGEX.special.test(password);

export const getCurrLocale = () => document.documentElement.lang;
