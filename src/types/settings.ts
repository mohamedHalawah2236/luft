import { ApiResponse } from '.';

export type GetUserProfileRes = ApiResponse<{
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}>;

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  file: File | null;
};

export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
};
