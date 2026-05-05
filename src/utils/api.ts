import { notFound } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { getTokens } from '@/lib/getTokens';

import { concatErrors } from './errors';
import { getLanguage } from './language';

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
  const language = await getLanguage();

  // Get fresh tokens from session (triggers JWT callback)
  const tokens = await getTokens();
  const token = tokens.accessToken;

  console.log('Token');
  console.log('#########################');
  console.log(token);

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      language,
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
      throw new Error('401 Unauthorized', {
        cause: res.status,
      });
    }

    const data = await res.json();
    if (data.errors) {
      throw new Error(concatErrors(data), {
        cause: data.statusCode,
      });
    }
    throw new Error(data.message, {
      cause: data.statusCode,
    });
  }

  const data = await res.json();
  if (data?.isError) {
    if (data.statusCode === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    }

    if (data.statusCode === 404) {
      notFound();
    }
    throw new Error(data?.message, {
      cause: data.statusCode,
    });
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
  const language = await getLanguage();

  // Get fresh tokens from session (triggers JWT callback)
  const tokens = await getTokens();
  const token = tokens.accessToken;

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      language,
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
      throw new Error('401 Unauthorized', {
        cause: res.status,
      });
    }

    const data = await res.json();
    if (data.errors) {
      throw new Error(concatErrors(data), {
        cause: data.statusCode,
      });
    }
    throw new Error(data.message, {
      cause: data.statusCode,
    });
  }

  const data = await res.json();
  if (data?.isError) {
    if (data.statusCode === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    }

    if (data.statusCode === 404) {
      notFound();
    }
    throw new Error(data?.message, {
      cause: data.statusCode,
    });
  }

  return data;
}
