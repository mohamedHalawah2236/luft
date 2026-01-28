import {
  LoginFormData,
  ResetPasswordFormData,
  SetRegisteredUserPasswordFormData,
  type SignupFormData,
  ValidateForgetPasswordOTPFormData,
  VerifyOtpPreregisterFormData,
} from '@/types/auth';

import { nextApiFetch, postData } from '@/utils/api';

export const sendOtpPreregister = async (userData: SignupFormData) =>
  postData('api/auth/register/send-otp-preregister', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const resendOtpPreregister = async (userData: SignupFormData) =>
  postData('api/auth/register/resend-otp-preregister', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const verifyOtpPreregister = async (
  virificationData: VerifyOtpPreregisterFormData,
) =>
  postData('api/auth/register/validate-preregister', {
    method: 'POST',
    body: JSON.stringify(virificationData),
  });

export const setRegisteredUserPassword = async (
  passwordData: SetRegisteredUserPasswordFormData,
) =>
  postData('api/auth/register/complete-register', {
    method: 'POST',
    body: JSON.stringify(passwordData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const sendOtpForgetPassword = async (email: string) =>
  postData('api/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({
      identifier: email,
      type: 1,
      otpPurpose: 1,
    }),
  });

export const validateForgetPasswordOtp = async ({
  email,
  otp,
}: ValidateForgetPasswordOTPFormData) =>
  postData('api/auth/validate-otp', {
    method: 'POST',
    body: JSON.stringify({
      identifier: email,
      code: otp,
      type: 1,
      otpPurpose: 1,
    }),
  });

export const resetPassword = async (resetPasswordData: ResetPasswordFormData) =>
  postData('api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(resetPasswordData),
  });

export const login = async (credentials: LoginFormData) =>
  postData('api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      emailOrPhone: credentials.email,
      password: credentials.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const logout = async (token: string) =>
  postData('api/auth/logout', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
