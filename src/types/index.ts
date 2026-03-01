import { Dispatch, SetStateAction } from 'react';

import { Locale } from '@/i18n/i18n.config';

export type Params = Promise<{ locale: Locale }>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type IconProps = {
  className?: string;
  fill?: string;
};

export type ApiResponse<T> = {
  statusCode: number;
  timestamp: string;
  isError: boolean;
  message: string;
  result: T;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type Direction = 'ltr' | 'rtl';
