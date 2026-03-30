import {
  ChangeUserIdentifierData,
  ProfileFormData,
  SendOtpData,
} from '@/types/settings';

import { getAllData, postData } from '@/utils/api';

export const getProfileData = (accessToken?: string) =>
  getAllData('api/auth/view-profile', undefined, accessToken);

export const updateUserProfile = (
  data: ProfileFormData,
  accessToken: string | undefined,
) => {
  const formData = new FormData();

  (Object.keys(data) as (keyof ProfileFormData)[]).forEach((key) => {
    const value = data[key];

    if (value !== undefined && value !== null) {
      formData.set(key, value as string | Blob);
    }
  });

  return postData(
    'api/auth/UpdateUserProfile',
    {
      body: formData,
      method: 'PUT',
    },
    accessToken,
  );
};

export const sendOtp = (data: SendOtpData, accessToken: string | undefined) => {
  return postData(
    'api/auth/send-otp',
    {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    accessToken,
  );
};

export const resendOtp = (
  data: SendOtpData,
  accessToken: string | undefined,
) => {
  return postData(
    'api/auth/send-otp',
    {
      body: JSON.stringify({ ...data, isResend: true }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    accessToken,
  );
};

export const changeUserIdentifier = (
  data: ChangeUserIdentifierData,
  accessToken: string | undefined,
) => {
  return postData(
    'api/auth/update-email-or-phone',
    {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    accessToken,
  );
};

export const changeUserPassword = (
  data: { currentPassword: string; newPassword: string },
  accessToken: string | undefined,
) => {
  return postData(
    'api/auth/change-password',
    {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    accessToken,
  );
};
