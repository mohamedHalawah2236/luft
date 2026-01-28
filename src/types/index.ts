import { Locale } from '@/i18n/i18n.config';

export type Params = Promise<{ locale: Locale }>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type IconProps = {
  className?: string;
};

export type ApiResponse<T> = {
  statusCode: number;
  timestamp: string;
  isError: boolean;
  message: string;
  result: T;
};
