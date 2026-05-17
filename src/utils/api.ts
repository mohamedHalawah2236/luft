import { notFound } from 'next/navigation';

import { concatErrors } from './errors';
import { getLanguage } from './language';
import { signOut } from './session';

export const getSession = async () => {
  if (typeof window === 'undefined') {
    const { getServerSession } = await import('./session');
    const session = await getServerSession();
    return session;
  }

  const sessionRes = await fetch('/api/auth/session');
  return sessionRes.json();
};

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

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  // accessToken?: string,
) {
  const language = await getLanguage();

  const session = await getSession();
  const accessToken = session?.accessToken;

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      language,
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      await signOut();
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
      await signOut();
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
    endpoints.map((endpoint) => apiFetch(endpoint, options)),
  );

  return res;
}
