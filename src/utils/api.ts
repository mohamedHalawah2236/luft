import { signOut } from 'next-auth/react';

import { ErrorApiResponse } from '@/types';

import { i18n } from '@/i18n/i18n.config';
import { getCurrLocale } from '@/lib/utils';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function updateSearchParams(key: string, value: string) {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(key, value);

  const newPathname = `${location.pathname}?${searchParams.toString()}`;

  return newPathname;
}

export function deleteSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search);

  const values = searchParams.getAll(paramName);

  const updatedValues = values.filter((value) => value !== paramValue);

  if (updatedValues.length > 0) {
    searchParams.set(paramName, updatedValues.join(','));
  } else {
    searchParams.delete(paramName);
  }

  return `?${searchParams.toString()}`;
}

export async function getAllData(
  endpoint: string,
  options: RequestInit = {},
  accessToken?: string,
) {
  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
      throw new Error('401 Unauthorized');
    }

    throw new Error(
      `Failed to retrieve data from ${endpoint}, status code: ${res.status}`,
    );
  }

  const data = await res.json();

  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data;
}

export async function getAllDataParallel(
  endpoints: string[],
  options: RequestInit = {},
) {
  const res = await Promise.all(
    endpoints.map((endpoint) => getAllData(endpoint, options)),
  );

  return res;
}

export async function postData(
  endpoint: string,
  options: RequestInit = {},
  accessToken?: string,
) {
  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
      throw new Error('401 Unauthorized');
    }

    const data: ErrorApiResponse = await res.json();

    throw new Error(`HTTP error! Status: ${res.status}`, {
      cause: data.statusCode,
    });
  }

  const data = await res.json();
  if (data?.isError) {
    throw new Error(data?.message, {
      cause: data.statusCode,
    });
  }

  return data;
}

export async function nextApiFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Language: getCurrLocale() ?? i18n.defaultLocale,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data;
}
