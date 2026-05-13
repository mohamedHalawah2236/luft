'use server';

import { cookies } from 'next/headers';

import { LoginFormData, SetRegisteredUserPasswordFormData } from '@/types/auth';

import { apiFetch } from '@/utils/api';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function loginAction(credentials: LoginFormData) {
  try {
    const response = await apiFetch('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        emailOrPhone: credentials.email,
        password: credentials.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response;

    const accessTokenExpiresAt = new Date(data.result.accessTokenExpiresAt);

    const refreshTokenExpiresAt = new Date(data.result.refreshTokenExpiresAt);
    // Set session cookies
    const cookieStore = await cookies();

    cookieStore.set('accessToken', data.result.accessToken, {
      ...COOKIE_OPTIONS,
      expires: accessTokenExpiresAt,
    });

    cookieStore.set('refreshToken', data.result.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });

    cookieStore.set(
      'refreshTokenExpiresAt',
      data.result.refreshTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    cookieStore.set(
      'accessTokenExpiresAt',
      data.result.accessTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    // Return the same format as the original function
    return response;
  } catch (error) {
    // Re-throw to maintain error handling
    throw error;
  }
}

export async function setRegisteredUserPasswordAction(
  passwordData: SetRegisteredUserPasswordFormData,
) {
  try {
    const response = await apiFetch('api/auth/register/complete-register', {
      method: 'POST',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response;

    const accessTokenExpiresAt = new Date(
      decodeURIComponent(data.result.accessTokenExpiresAt),
    );

    const refreshTokenExpiresAt = new Date(
      decodeURIComponent(data.result.refreshTokenExpiresAt),
    );
    // Set session cookies
    const cookieStore = await cookies();

    cookieStore.set('accessToken', data.result.accessToken, {
      ...COOKIE_OPTIONS,
      expires: accessTokenExpiresAt,
    });

    cookieStore.set('refreshToken', data.result.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });

    cookieStore.set(
      'refreshTokenExpiresAt',
      data.result.refreshTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    cookieStore.set(
      'accessTokenExpiresAt',
      data.result.accessTokenExpiresAt,
      COOKIE_OPTIONS,
    );

    // Return the same format as the original function
    return response;
  } catch (error) {
    // Re-throw to maintain error handling
    throw error;
  }
}
