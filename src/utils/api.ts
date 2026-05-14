import { notFound } from 'next/navigation';

import { UserSession } from '@/types/session';
import { concatErrors } from './errors';
import { getLanguage } from './language';
import { getServerSession, signOut } from './session';

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

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  session?: UserSession,
) {
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const language = await getLanguage();

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
export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  accessToken?: string,
) {
  const language = await getLanguage();

  // If no explicit token was passed, try to get one from the session.
  // Refresh proactively if the access token is expired but the refresh token is not.
  let tokenToUse = accessToken;
  if (!tokenToUse) {
    const session = await getServerSession();
    if (session) {
      const isAccessExpired = Date.now() >= session.accessTokenExpiresAt;
      const isRefreshExpired = Date.now() >= session.refreshTokenExpiresAt;

      if (isAccessExpired && !isRefreshExpired) {
        // Call the internal Route Handler — the only context where cookies
        // can be written from a server-to-server call.
        const appUrl =
          process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
        const refreshRes = await fetch(`${appUrl}/api/auth/refresh`, {
          method: 'POST',
        });
        if (refreshRes.ok) {
          const { accessToken: freshToken } = await refreshRes.json();
          tokenToUse = freshToken;
        }
      } else if (!isAccessExpired) {
        tokenToUse = session.accessToken;
      }
      // If both tokens are expired, tokenToUse stays undefined → unauthenticated request.
    }
  }

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers: {
      language,
      ...(options.headers || {}),
      ...(tokenToUse ? { Authorization: `Bearer ${tokenToUse}` } : {}),
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
