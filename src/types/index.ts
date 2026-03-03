import { Dispatch, SetStateAction } from 'react';

export type Params = Promise<{ locale: string }>;
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
