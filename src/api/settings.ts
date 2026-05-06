import {
  ChangeUserIdentifierData,
  ProfileFormData,
  SendOtpData,
} from '@/types/settings';

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

  return postData('api/auth/UpdateUserProfile', {
    body: formData,
    method: 'PUT',
  });
};

export const sendOtp = (data: SendOtpData) => {
  return postData('api/auth/send-otp', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const resendOtp = (data: SendOtpData) => {
  return postData('api/auth/send-otp', {
    body: JSON.stringify({ ...data, isResend: true }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const changeUserIdentifier = (data: ChangeUserIdentifierData) => {
  return postData('api/auth/update-email-or-phone', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const changeUserPassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return postData('api/auth/change-password', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
