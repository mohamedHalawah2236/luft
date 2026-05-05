import { notFound } from 'next/navigation';
import { getSession, signOut } from 'next-auth/react';

import { concatErrors } from './errors';
import { getLanguage } from './language';

// Store the session update function
let sessionUpdateFn: ((data?: any) => Promise<any>) | null = null;

export function setSessionUpdate(updateFn: (data?: any) => Promise<any>) {
  sessionUpdateFn = updateFn;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<{
  accessToken: string;
  refreshToken: string;
}> | null = null;

async function refreshAccessToken(refreshToken: string) {
  // Prevent multiple simultaneous refresh requests
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const language = await getLanguage();
      const response = await fetch(`${apiUrl}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          language,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();

      return {
        accessToken: data.result.accessToken,
        refreshToken: data.result.refreshToken,
      };
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function handleTokenRefresh(
  makeRequest: (token?: string) => Promise<Response>,
) {
  try {
    const session = await getSession();
    if (!session?.refreshToken) {
      throw new Error('No refresh token available');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken(session.refreshToken as string);

    // Update the session with new tokens using the session update function
    if (sessionUpdateFn) {
      await sessionUpdateFn({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }

    // Retry the request with new token
    return await makeRequest(newAccessToken);
  } catch (error) {
    signOut({
      redirect: false,
      callbackUrl: '/login',
    });
    throw error;
  }
}

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

  const makeRequest = async (token?: string) => {
    return fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      headers: {
        language,
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };

  let res = await makeRequest(accessToken);

  // Handle 401 with token refresh
  if (res.status === 401 && accessToken) {
    res = await handleTokenRefresh(makeRequest);
  }

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      signOut({
        redirect: false,
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
        redirect: false,
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

  const makeRequest = async (token?: string) => {
    return fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      headers: {
        language,
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };

  let res = await makeRequest(accessToken);

  // Handle 401 with token refresh
  if (res.status === 401 && accessToken) {
    res = await handleTokenRefresh(makeRequest);
  }

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 401) {
      signOut({
        redirect: false,
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
        redirect: false,
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
