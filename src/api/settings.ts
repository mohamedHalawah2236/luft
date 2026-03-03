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
