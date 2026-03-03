import { ProfileFormData } from '@/types/settings';

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

export const sendOtp = (accessToken: string | undefined) => {
  return postData(
    'api/auth/send-otp',
    {
      body: JSON.stringify({
        identifier: 'string',
        // Change type and otpPurpose based on phone or email
        otpPurpose: 1,
        type: 1,
      }),
      method: 'POST',
    },
    accessToken,
  );
};

export const changeUserEmailOrPone = (
  otp: string,
  accessToken: string | undefined,
) => {
  return postData(
    'api/auth/update-email-or-phone',
    {
      body: JSON.stringify({
        newIdentifier: 'string',
        // Change type and otpPurpose based on phone or email
        type: 1,
        otpCode: otp,
      }),
      method: 'POST',
    },
    accessToken,
  );
};
