import { ProfileFormData } from '@/types/settings';

import { getAllData, postData } from '@/utils/api';

export const getProfileData = () => getAllData('api/auth/view-profile');

export const updateUserProfile = (data: ProfileFormData) => {
  const formData = new FormData();

  (Object.keys(data) as (keyof ProfileFormData)[]).forEach((key) => {
    const value = data[key];

    if (value !== undefined && value !== null) {
      formData.set(key, value as string | Blob);
    }
  });

  postData('api/auth/view-profile', {
    body: formData,
    method: 'PUT',
  });
};
